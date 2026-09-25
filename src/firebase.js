import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported as analyticsIsSupported } from 'firebase/analytics';
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported as messagingIsSupported,
} from 'firebase/messaging';

// Keep this config in sync with public/firebase-messaging-sw.js
const firebaseConfig = {
    apiKey: 'AIzaSyDhTmysW8dCJQl80iEC2VEseWAShJuruKA',
    authDomain: 'bidndrive-65be3.firebaseapp.com',
    projectId: 'bidndrive-65be3',
    storageBucket: 'bidndrive-65be3.firebasestorage.app',
    messagingSenderId: '627802907244',
    appId: '1:627802907244:web:af15122f58ba86ce936e49',
    measurementId: 'G-DFYRRJWDXF',
};

const app = initializeApp(firebaseConfig);

// Analytics — skipped silently where unsupported (e.g. some embedded browsers)
analyticsIsSupported()
    .then(ok => { if (ok) getAnalytics(app); })
    .catch(() => { });

// Messaging — null where unsupported (no service worker / notification APIs)
const messagingPromise = messagingIsSupported()
    .then(ok => (ok ? getMessaging(app) : null))
    .catch(() => null);

/**
 * Ask for notification permission, register the FCM service worker and
 * return the device token (or null if unsupported / permission denied).
 */
export const requestFcmToken = async () => {
    const messaging = await messagingPromise;
    if (!messaging || !('Notification' in window) || !('serviceWorker' in navigator)) return null;

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return null;

    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    return getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: registration,
    });
};

/**
 * Generate the FCM device token and push it to the backend.
 * Called right after login; safe to fire-and-forget.
 * Returns the token, or null if unsupported / permission denied.
 */
export const registerFcmToken = async (adminToken) => {
    try {
        const fcmToken = await requestFcmToken();
        if (!fcmToken) return null;
        console.log('FCM device token:', fcmToken);

        await axios.put(
            `${import.meta.env.VITE_API_URL}/api/franchise/update-fcm-token`,
            { fcmtoken: fcmToken, },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${adminToken}`,
                },
            }
        );

        console.log('FCM token registered with backend');
        return fcmToken;
    } catch (err) {
        console.error('FCM token registration failed', err);
        return null;
    }
};

/**
 * Subscribe to messages received while the app tab is in the foreground.
 * Returns an unsubscribe function.
 */
export const onForegroundMessage = (callback) => {
    let unsubscribe = () => { };
    messagingPromise.then(messaging => {
        if (messaging) unsubscribe = onMessage(messaging, callback);
    });
    return () => unsubscribe();
};

export default app;
