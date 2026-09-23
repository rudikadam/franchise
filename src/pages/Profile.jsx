import { Box, Card, Typography, Avatar, Grid, Button, Divider, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Mail, Phone, MapPin, Building2, Calendar, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user, login } = useAuth();
    const navigate = useNavigate();

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ mr: 2, bgcolor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <ArrowLeft size={20} />
                </IconButton>
                <Typography variant="h5" fontWeight="bold">My Profile</Typography>
            </Box>

            <Card sx={{ mb: 4, overflow: 'hidden' }}>
                <Box sx={{ height: 160, bgcolor: 'primary.main', position: 'relative' }}>
                    <Typography variant="h4" color="white" sx={{ position: 'absolute', bottom: 20, right: 20, opacity: 0.5, fontWeight: 'bold' }}>
                        Bid N Drive
                    </Typography>
                </Box>
                <Box sx={{ px: 4, pb: 4, display: 'flex', alignItems: 'flex-start' }}>
                    <Avatar
                        sx={{
                            width: 120, height: 120,
                            border: '4px solid white',
                            mt: -6, mr: 3,
                            bgcolor: 'secondary.main',
                            fontSize: '3rem'
                        }}
                    >
                        {user?.name?.charAt(0) || 'U'}
                    </Avatar>
                    <Box sx={{ pt: 2, flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                                <Typography variant="h5" fontWeight="bold">{user?.name}</Typography>
                                <Typography variant="subtitle1" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                                    {user?.role} Role
                                </Typography>
                            </Box>
                            <Button variant="contained">Edit Profile</Button>
                        </Box>
                    </Box>
                </Box>
            </Card>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 4, height: '100%' }}>
                        <Typography variant="h6" fontWeight="bold" mb={3}>Personal Information</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Mail size={20} color="#888" />
                                <Typography>user@franchise.com</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Phone size={20} color="#888" />
                                <Typography>+91 98765 43210</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <MapPin size={20} color="#888" />
                                <Typography>Mumbai, India</Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Building2 size={20} color="#888" />
                                <Typography>Metro Motors</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Calendar size={20} color="#888" />
                                <Typography>Joined Jan 2026</Typography>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 4, height: '100%' }}>
                        <Typography variant="h6" fontWeight="bold" mb={2}>Account Settings & Security</Typography>
                        <Typography color="text.secondary" mb={4}>Manage your preferences, security settings, and personal data.</Typography>

                        <Box mb={3}>
                            <Typography variant="subtitle1" fontWeight="bold">Two-Factor Authentication</Typography>
                            <Typography variant="body2" color="text.secondary" mb={1}>Protect your account with an extra layer of security.</Typography>
                            <Button variant="outlined" color="primary">Enable 2FA</Button>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">Change Password</Typography>
                            <Typography variant="body2" color="text.secondary" mb={2}>Update your password regularly to keep your account secure.</Typography>
                            <Button variant="outlined" color="primary">Update Password</Button>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
