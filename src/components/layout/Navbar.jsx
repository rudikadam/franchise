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
        <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>


                    <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mr: 6, display: { xs: 'none', sm: 'block' } }}>
                        Bid N Drive
                    </Typography>

                    <Box sx={{ display: 'block', mr: 10 }}>
                        <IconButton edge="start" color="inherit" sx={{ mr: 2, borderRadius: 2, px: 3, py: 1 }} onClick={toggleSidebar}>
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f5f5f5', borderRadius: 2, px: 3, py: 1 }}>
                        <SearchIcon color="action" />
                        <Box component="input" placeholder="Search..." sx={{ ml: 1, border: 'none', bgcolor: 'transparent', outline: 'none' }} />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton sx={{ mr: 2 }}>
                        <NotificationsIcon />
                    </IconButton>


                    <IconButton onClick={() => navigate('/profile')} sx={{ p: 0 }}>
                        <Avatar sx={{ bgcolor: 'secondary.main', width: 35, height: 35 }}>
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </Avatar>
                    </IconButton>

                </Box>

            </Toolbar>
        </AppBar>
    );
}
