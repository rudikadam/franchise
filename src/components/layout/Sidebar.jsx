import { Link, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme, IconButton } from '@mui/material';
import {
    LayoutDashboard, PlusSquare, List as ListIcon, Bell, Users, Building2, Gavel, User, LogOut, FileText, XCircle, CheckCircle
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
                width: open ? drawerWidth : 80,
                flexShrink: 0,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.easeInOut,
                    duration: 300,
                }),
                '& .MuiDrawer-paper': {
                    position: 'relative',
                    height: '100%',
                    width: open ? drawerWidth : 80,
                    boxSizing: 'border-box',
                    borderRight: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
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
                                borderRadius: 2,
                                bgcolor: active ? theme.palette.primary.light : 'transparent',
                                color: active ? theme.palette.primary.main : 'text.primary',
                                justifyContent: open ? 'initial' : 'center',
                                '&:hover': {
                                    bgcolor: theme.palette.primary.light,
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
                                color: active ? theme.palette.primary.main : 'text.secondary'
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
                                primaryTypographyProps={{ fontWeight: active ? 600 : 400 }}
                            />
                        </ListItem>
                    );
                })}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            <List sx={{ px: 2, mb: 1 }}>
                <ListItem
                    button
                    component={Link}
                    to="/profile"
                    sx={{
                        mb: 1,
                        borderRadius: 2,
                        bgcolor: location.pathname.startsWith('/profile') ? theme.palette.primary.light : 'transparent',
                        color: location.pathname.startsWith('/profile') ? theme.palette.primary.main : 'text.primary',
                        justifyContent: open ? 'initial' : 'center',
                        '&:hover': {
                            bgcolor: theme.palette.primary.light,
                            color: theme.palette.primary.main,
                            '& .MuiListItemIcon-root': { color: theme.palette.primary.main }
                        },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 0, justifyContent: 'center', color: location.pathname.startsWith('/profile') ? theme.palette.primary.main : 'text.secondary' }}>
                        <User size={20} />
                    </ListItemIcon>
                    <ListItemText
                        primary="Profile"
                        sx={{ opacity: open ? 1 : 0, width: open ? 'auto' : 0, overflow: 'hidden', whiteSpace: 'nowrap', transition: 'all 0.3s ease-in-out' }}
                        primaryTypographyProps={{ fontWeight: location.pathname.startsWith('/profile') ? 600 : 400 }}
                    />
                </ListItem>

                <ListItem
                    button
                    onClick={logout}
                    sx={{
                        borderRadius: 2,
                        color: 'error.main',
                        justifyContent: open ? 'initial' : 'center',
                        '&:hover': {
                            bgcolor: 'error.light',
                            '& .MuiListItemIcon-root': { color: 'error.dark' }
                        },
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 0, justifyContent: 'center', color: 'error.main', transition: 'color 0.2s' }}>
                        <LogOut size={20} />
                    </ListItemIcon>
                    <ListItemText
                        primary="Logout"
                        sx={{ opacity: open ? 1 : 0, width: open ? 'auto' : 0, overflow: 'hidden', whiteSpace: 'nowrap', transition: 'all 0.3s ease-in-out' }}
                    />
                </ListItem>
            </List>
        </Drawer>
    );
}
