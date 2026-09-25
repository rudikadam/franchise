import { Box, AppBar, Toolbar, IconButton, Avatar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { Route } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ toggleSidebar }) {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <AppBar
            position="sticky"
            color="transparent"
            elevation={0}
            className="navbar-glass"
            sx={{
                margin: '16px',
                width: 'auto',
                borderRadius: '32px',
                zIndex: 1100,
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(28px) saturate(160%)',
                border: '1px solid rgba(255,255,255,0.7)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,1)',
                color: '#333'
            }}
        >
            <Toolbar sx={{ minHeight: '64px', px: 3 }}>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mr: 6, display: { xs: 'none', sm: 'block' }, color: 'primary.main' }}>
                        Bid N Drive
                    </Typography>

                    <Box sx={{ display: 'block', mr: { xs: 2, sm: 6 } }}>
                        <IconButton edge="start" sx={{ color: '#333', borderRadius: '16px', px: 2, py: 1, backgroundColor: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)', transition: 'all 0.3s', '&:hover': { backgroundColor: 'rgba(0,0,0,0.08)' } }} onClick={toggleSidebar}>
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(6px)',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        borderRadius: '16px',
                        px: 2,
                        py: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            borderColor: 'rgba(255, 255, 255, 1)'
                        },
                        '&:focus-within': {
                            borderColor: 'rgba(66,133,244,0.6)',
                            boxShadow: '0 0 0 4px rgba(66,133,244,0.16)',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)'
                        }
                    }}>
                        <SearchIcon sx={{ color: 'rgba(0,0,0,0.5)' }} />
                        <Box component="input" placeholder="Search..." sx={{
                            ml: 1,
                            border: 'none',
                            bgcolor: 'transparent',
                            outline: 'none',
                            color: '#333',
                            fontSize: '15px',
                            '::placeholder': {
                                color: 'rgba(0,0,0,0.4)'
                            }
                        }} />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                        onClick={() => navigate('/notifications')}
                        sx={{
                            color: '#333',
                            borderRadius: '16px',
                            backgroundColor: 'rgba(0,0,0,0.03)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            transition: 'all 0.3s',
                            '&:hover': { backgroundColor: 'rgba(0,0,0,0.08)' }
                        }}
                    >
                        <NotificationsIcon />
                    </IconButton>

                    <IconButton onClick={() => navigate('/profile')} sx={{ p: 0 }}>
                        <Avatar sx={{
                            bgcolor: 'primary.main',
                            width: 40,
                            height: 40,
                            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                            border: '2px solid rgba(255,255,255,0.8)',
                            color: '#fff'
                        }}>
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </Avatar>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
