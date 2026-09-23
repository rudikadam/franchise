import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Box, Typography } from '@mui/material';

export default function ProtectedRoute({ children, roles }) {
    const { user, loading } = useAuth();

    if (loading) return <Box p={3}>Loading...</Box>;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(user.role)) {
        return (
            <Box p={6} textAlign="center">
                <Typography variant="h3" color="error">403</Typography>
                <Typography variant="h6">Access Denied</Typography>
                <Typography color="text.secondary">You do not have permission to view this page.</Typography>
            </Box>
        );
    }

    return children;
}
