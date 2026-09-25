import { Link, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme, IconButton, Avatar } from '@mui/material';
import {
    LayoutDashboard, PlusSquare, List as ListIcon, Bell, Users, Building2, Gavel, User, LogOut, FileText, XCircle, CheckCircle, Car
} from 'lucide-react';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../context/AuthContext';

const getMenuItems = (role) => {
    if (role === 'admin' || role === 'manager') {
        return [
            { id: 'dashboard', title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
            { id: 'franchises', title: 'Franchises', icon: <Building2 size={20} />, path: '/admin/franchises' },
            { id: 'leads', title: 'Leads', icon: <ListIcon size={20} />, path: '/admin/leads' },
            { id: 'lead-management', title: 'Lead Management', icon: <FileText size={20} />, path: '/lead-management' },
            { id: 'rejected-leads', title: 'Rejected Leads', icon: <XCircle size={20} />, path: '/rejected-leads' },
            { id: 'closed-leads', title: 'Closed Leads', icon: <CheckCircle size={20} />, path: '/closed-leads' },
            { id: 'users', title: 'Users', icon: <Users size={20} />, path: '/admin/users' }
        ];
    }
    if (role === 'pa' || role === 'bidding-team') {
        return [
            { id: 'dashboard', title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
            { id: 'bidding', title: 'Bidding Queue', icon: <Gavel size={20} />, path: '/pa/bidding' }
        ];
    }
    // Default Franchise Role
    return [
        { id: 'dashboard', title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
        { id: 'franchise-cars', title: 'Franchise Cars', icon: <Car size={20} />, path: '/franchise-cars' },
        { id: 'car-enquiries', title: 'Car Enquiries', icon: <ListIcon size={20} />, path: '/car-enquiries' },
        // { id: 'create-enquiry', title: 'Create Enquiry', icon: <PlusSquare size={20} />, path: '/enquiries/create' },
        { id: 'my-enquiries', title: 'My Enquiries', icon: <ListIcon size={20} />, path: '/enquiries' },
        { id: 'lead-management', title: 'Lead Management', icon: <FileText size={20} />, path: '/lead-management' },
        { id: 'rejected-leads', title: 'Rejected Leads', icon: <XCircle size={20} />, path: '/rejected-leads' },
        { id: 'closed-leads', title: 'Closed Leads', icon: <CheckCircle size={20} />, path: '/closed-leads' },
    ];
};

export default function Sidebar({ open, toggleSidebar }) {
    const theme = useTheme();
    const location = useLocation();
    const { user, logout } = useAuth();

    const drawerWidth = 260;
    const menuItems = getMenuItems(user?.role || 'franchise');

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: open ? drawerWidth + 16 : 80 + 16,
                flexShrink: 0,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.easeInOut,
                    duration: 300,
                }),
                '& .MuiDrawer-paper': {
                    position: 'relative',
                    height: 'calc(100vh - 120px)',
                    margin: '0 0 16px 16px',
                    borderRadius: '32px',
                    width: open ? drawerWidth : 80,
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'rgba(255, 255, 255, 0.65)',
                    backdropFilter: 'blur(28px) saturate(160%)',
                    border: '1px solid rgba(255,255,255,0.7)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,1)',
                    color: '#333',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.easeInOut,
                        duration: 300,
                    }),
                    overflowX: 'hidden',
                },
            }}
        >
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 64 }}>
                {/* Logo and Menu Toggle have been moved to Navbar */}
            </Box>
            <List sx={{ px: 2 }}>
                {menuItems.map((item) => {
                    const active = location.pathname.startsWith(item.path);
                    return (
                        <ListItem
                            button
                            component={Link}
                            to={item.path}
                            key={item.id}
                            sx={{
                                mb: 1,
                                borderRadius: '16px',
                                bgcolor: active ? 'rgba(0,0,0,0.05)' : 'transparent',
                                color: active ? theme.palette.primary.main : '#333',
                                border: active ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
                                justifyContent: open ? 'initial' : 'center',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    bgcolor: 'rgba(0,0,0,0.05)',
                                    borderColor: 'rgba(0,0,0,0.05)',
                                    color: theme.palette.primary.main,
                                    '& .MuiListItemIcon-root': {
                                        color: theme.palette.primary.main,
                                    }
                                },
                            }}
                        >
                            <ListItemIcon sx={{
                                minWidth: 0,
                                mr: open ? 2 : 0,
                                justifyContent: 'center',
                                color: active ? theme.palette.primary.main : 'rgba(0,0,0,0.6)',
                                transition: 'all 0.3s ease'
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.title}
                                sx={{
                                    opacity: open ? 1 : 0,
                                    width: open ? 'auto' : 0,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.3s ease-in-out'
                                }}
                                primaryTypographyProps={{ fontWeight: active ? 600 : 500, fontSize: '15px' }}
                            />
                        </ListItem>
                    );
                })}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ p: open ? 2 : 1, mb: 1, transition: 'padding 0.3s ease' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: open ? 'space-between' : 'center',
                        flexDirection: open ? 'row' : 'column',
                        p: open ? 1.5 : 1,
                        borderRadius: '16px',
                        bgcolor: 'rgba(255,255,255,0.4)',
                        border: '1px solid rgba(0,0,0,0.06)',
                        boxShadow: 'inset 0 1px 1px rgba(255,255,255,1), 0 4px 15px rgba(0,0,0,0.03)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.7)',
                            borderColor: 'rgba(0,0,0,0.1)'
                        }
                    }}
                >
                    <Box
                        component={Link}
                        to="/profile"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'inherit',
                            flexGrow: 1,
                            overflow: 'hidden',
                            minWidth: 0,
                            mr: open ? 1 : 0
                        }}
                    >
                        <Avatar
                            sx={{
                                width: open ? 40 : 36,
                                height: open ? 40 : 36,
                                bgcolor: 'primary.main',
                                color: '#fff',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                fontSize: open ? '1.2rem' : '1rem',
                                transition: 'all 0.3s ease',
                                flexShrink: 0
                            }}
                        >
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </Avatar>

                        <Box sx={{
                            ml: 1.5,
                            display: open ? 'block' : 'none',
                            minWidth: 0,
                            overflow: 'hidden'
                        }}>
                            <Typography variant="subtitle2" fontWeight="700" color="#333" noWrap title={user?.name || 'My Profile'}>
                                {user?.name || 'My Profile'}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.6)', textTransform: 'capitalize' }} noWrap>
                                {user?.role || 'View Account'}
                            </Typography>
                        </Box>
                    </Box>

                    <IconButton
                        onClick={logout}
                        title="Logout"
                        sx={{
                            mt: open ? 0 : 1.5,
                            flexShrink: 0,
                            bgcolor: 'rgba(211,47,47,0.08)',
                            color: '#d32f2f',
                            border: '1px solid rgba(211,47,47,0.2)',
                            transition: 'all 0.3s ease',
                            p: 1,
                            '&:hover': {
                                bgcolor: 'rgba(211,47,47,0.2)',
                                transform: 'scale(1.05)',
                                color: '#c62828'
                            }
                        }}
                    >
                        <LogOut size={open ? 18 : 20} />
                    </IconButton>
                </Box>
            </Box>
        </Drawer>
    );
}
