import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, IconButton, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { onForegroundMessage } from '../firebase';

export default function Notifications() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: 'Welcome to Bid N Drive',
            body: 'Your account has been successfully created. You can now start managing enquiries.',
            time: new Date().toISOString(),
            read: false,
            type: 'system'
        }
    ]);

    useEffect(() => {
        // Make sure we only add standard notifications or push ones depending on if Firebase is initialized
        // Listen to new foreground messages specific to this page
        const unsubscribe = onForegroundMessage((payload) => {
            const newNotif = {
                id: Date.now(),
                title: payload.notification?.title || 'New Notification',
                body: payload.notification?.body || '',
                time: new Date().toISOString(),
                read: false,
                type: 'push'
            };
            setNotifications(prev => [newNotif, ...prev]);
        });

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: 'primary.dark' }}>
                    Notifications
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<CheckCircleIcon />}
                    onClick={markAllAsRead}
                    sx={{ borderRadius: 8 }}
                >
                    Mark all as read
                </Button>
            </Box>

            <Card sx={{
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
            }}>
                {notifications.length === 0 ? (
                    <Box sx={{ p: 5, textAlign: 'center' }}>
                        <NotificationsIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">No new notifications</Typography>
                        <Typography variant="body2" color="text.disabled">You're all caught up!</Typography>
                    </Box>
                ) : (
                    <List disablePadding>
                        {notifications.map((notification, index) => (
                            <React.Fragment key={notification.id}>
                                <ListItem
                                    alignItems="flex-start"
                                    sx={{
                                        p: 3,
                                        bgcolor: notification.read ? 'transparent' : 'rgba(94, 53, 177, 0.04)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': { bgcolor: 'rgba(94, 53, 177, 0.08)' }
                                    }}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteNotification(notification.id)} sx={{ color: 'text.secondary' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{
                                            bgcolor: notification.type === 'push' ? 'secondary.main' : 'primary.main',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                        }}>
                                            <NotificationsIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" fontWeight={notification.read ? 'normal' : 'bold'} sx={{ color: 'text.primary', mb: 0.5 }}>
                                                {notification.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography variant="body2" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                                                    {notification.body}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 'medium' }}>
                                                    {new Date(notification.time).toLocaleString()}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                {index < notifications.length - 1 && <Divider component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                )}
            </Card>
        </Box>
    );
}
