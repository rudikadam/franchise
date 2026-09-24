import { Box, Card, Typography, Avatar, Grid, Button, Divider, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Mail, Phone, MapPin, Building2, Calendar, ArrowLeft, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.65)',
    backdropFilter: 'blur(28px) saturate(160%)',
    border: '1px solid rgba(255,255,255,0.7)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,1)',
    borderRadius: '32px',
    color: '#333',
};

export default function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ mr: 2, ...glassCardStyle, borderRadius: '16px', width: 44, height: 44 }}>
                    <ArrowLeft size={20} color="#333" />
                </IconButton>
                <Typography variant="h5" fontWeight="bold" color="#333">My Profile</Typography>
            </Box>

            <Card sx={{ mb: 4, overflow: 'hidden', ...glassCardStyle }}>
                <Box sx={{ height: 160, background: 'linear-gradient(135deg, rgba(30,136,229,0.5), rgba(94,53,177,0.5))', position: 'relative' }}>
                    <Typography variant="h4" color="white" sx={{ position: 'absolute', bottom: 20, right: 20, opacity: 0.8, fontWeight: 'bold' }}>
                        Bid N Drive
                    </Typography>
                </Box>
                <Box sx={{ px: 4, pb: 4, display: 'flex', alignItems: 'flex-start' }}>
                    <Avatar
                        sx={{
                            width: 120, height: 120,
                            border: '4px solid rgba(255,255,255,0.8)',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                            mt: -6, mr: 3,
                            bgcolor: 'primary.main',
                            fontSize: '3rem',
                            color: '#fff'
                        }}
                    >
                        {user?.name?.charAt(0) || 'U'}
                    </Avatar>
                    <Box sx={{ pt: 2, flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                                <Typography variant="h5" fontWeight="bold">{user?.name || 'My Profile'}</Typography>
                                <Typography variant="subtitle1" color="rgba(0,0,0,0.6)" sx={{ textTransform: 'capitalize' }}>
                                    {user?.role || 'Role'} Account
                                </Typography>
                            </Box>
                            <Button sx={{
                                borderRadius: '16px',
                                bgcolor: 'rgba(0,0,0,0.05)',
                                border: '1px solid rgba(0,0,0,0.1)',
                                color: '#333',
                                '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' }
                            }}>
                                Edit Profile
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Card>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 4, height: '100%', ...glassCardStyle }}>
                        <Typography variant="h6" fontWeight="bold" mb={3}>Personal Information</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Mail size={20} color="rgba(0,0,0,0.6)" />
                                <Typography>user@franchise.com</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Phone size={20} color="rgba(0,0,0,0.6)" />
                                <Typography>+91 98765 43210</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <MapPin size={20} color="rgba(0,0,0,0.6)" />
                                <Typography>Mumbai, India</Typography>
                            </Box>
                            <Divider sx={{ borderColor: 'rgba(0,0,0,0.1)' }} />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Building2 size={20} color="rgba(0,0,0,0.6)" />
                                <Typography>Metro Motors</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Calendar size={20} color="rgba(0,0,0,0.6)" />
                                <Typography>Joined Jan 2026</Typography>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 4, height: '100%', ...glassCardStyle }}>
                        <Typography variant="h6" fontWeight="bold" mb={2}>Account Settings & Security</Typography>
                        <Typography sx={{ color: 'rgba(0,0,0,0.6)' }} mb={4}>Manage your preferences, security settings, and personal data.</Typography>

                        <Box mb={3}>
                            <Typography variant="subtitle1" fontWeight="bold">Two-Factor Authentication</Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.5)' }} mb={1}>Protect your account with an extra layer of security.</Typography>
                            <Button sx={{ borderRadius: '16px' }} variant="outlined" color="primary">Enable 2FA</Button>
                        </Box>

                        <Divider sx={{ my: 3, borderColor: 'rgba(0,0,0,0.1)' }} />

                        <Box mb={4}>
                            <Typography variant="subtitle1" fontWeight="bold">Change Password</Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.5)' }} mb={2}>Update your password regularly to keep your account secure.</Typography>
                            <Button sx={{ borderRadius: '16px' }} variant="outlined" color="primary">Update Password</Button>
                        </Box>

                        <Divider sx={{ my: 3, borderColor: 'rgba(0,0,0,0.1)' }} />

                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" color="error">Logout of Account</Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.5)' }} mb={2}>End your current session securely.</Typography>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={logout}
                                startIcon={<LogOut size={18} />}
                                sx={{
                                    borderRadius: '16px',
                                    bgcolor: 'rgba(211,47,47,0.1)',
                                    color: '#d32f2f',
                                    fontWeight: 'bold',
                                    boxShadow: 'none',
                                    border: '1px solid rgba(211,47,47,0.3)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: 'rgba(211,47,47,0.15)',
                                        borderColor: 'rgba(211,47,47,0.5)',
                                        boxShadow: 'none',
                                        transform: 'translateY(-2px)'
                                    }
                                }}
                            >
                                Log Out Now
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
