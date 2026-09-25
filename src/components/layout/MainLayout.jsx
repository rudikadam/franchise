import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Breadcrumb from './Breadcrumb';
import { Box, Snackbar, Alert, Typography } from '@mui/material';
import { onForegroundMessage, registerFcmToken } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [notificationData, setNotificationData] = useState({ title: '', body: '' });

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            registerFcmToken(token);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = onForegroundMessage((payload) => {
            if (payload?.notification) {
                setNotificationData({
                    title: payload.notification.title || 'New Notification',
                    body: payload.notification.body || ''
                });
                setSnackbarOpen(true);
            }
        });

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', overflow: 'hidden', bgcolor: '#f0f2f5' }}>
            {/* Animated Background from Login */}
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                overflow: 'hidden',
                background: '#f0f2f5',
                pointerEvents: 'none'
            }}>
                <div className="lg-blob lg-b1" />
                <div className="lg-blob lg-b2" />
                <div className="lg-blob lg-b3" />
                <div className="lg-blob lg-b4" />
            </div>

            <style>{`
                .lg-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: .45;
                    will-change: transform;
                }
                .lg-b1 { width: 46vmax; height: 46vmax; background: radial-gradient(circle, #4285f4, transparent 70%); top: -14vmax; left: -12vmax; animation: lgFloat1 22s ease-in-out infinite; }
                .lg-b2 { width: 38vmax; height: 38vmax; background: radial-gradient(circle, #ea4335, transparent 70%); bottom: -12vmax; right: -10vmax; animation: lgFloat2 26s ease-in-out infinite; }
                .lg-b3 { width: 34vmax; height: 34vmax; background: radial-gradient(circle, #fbbc05, transparent 70%); bottom: 8vmax; left: -10vmax; animation: lgFloat3 19s ease-in-out infinite; }
                .lg-b4 { width: 30vmax; height: 30vmax; background: radial-gradient(circle, #34a853, transparent 70%); top: 6vmax; right: 4vmax; animation: lgFloat1 24s ease-in-out infinite reverse; }

                @keyframes lgFloat1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(4vmax,3vmax) scale(1.08); } }
                @keyframes lgFloat2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-3vmax,-4vmax) scale(1.1); } }
                @keyframes lgFloat3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(3vmax,-2vmax) scale(1.05); } }
            `}</style>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ top: { xs: 80, sm: 90 } }}
            >
                <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%', boxShadow: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold">{notificationData.title}</Typography>
                    <Typography variant="body2">{notificationData.body}</Typography>
                </Alert>
            </Snackbar>

            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                <Navbar toggleSidebar={toggleSidebar} />
                <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
                    <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            width: { sm: `calc(100% - ${sidebarOpen ? 260 : 80}px)` },
                            transition: 'width 0.3s ease',
                            overflowY: 'auto'
                        }}
                    >
                        <Box sx={{ p: 3, flexGrow: 1, position: 'relative' }}>
                            <Breadcrumb />
                            <div className="mt-4">
                                <Outlet />
                            </div>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
