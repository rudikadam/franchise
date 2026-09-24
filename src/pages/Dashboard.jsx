import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import {
    FileText, PlusSquare, Clock, Gavel, CheckCircle, IndianRupee, CarFront, XCircle
} from 'lucide-react';

const statCards = [
    { title: 'Total Enquiries', value: '142', icon: <FileText />, color: '#5e35b1', bg: 'rgba(94, 53, 177, 0.15)' },
    { title: 'New Enquiries', value: '12', icon: <PlusSquare />, color: '#1e88e5', bg: 'rgba(30, 136, 229, 0.15)' },
    { title: 'In Process', value: '28', icon: <Clock />, color: '#fb8c00', bg: 'rgba(251, 140, 0, 0.15)' },
    { title: 'Bidding In Progress', value: '15', icon: <Gavel />, color: '#8e24aa', bg: 'rgba(142, 36, 170, 0.15)' },
    { title: 'Highest Bid Received', value: '10', icon: <CheckCircle />, color: '#00897b', bg: 'rgba(0, 137, 123, 0.15)' },
    { title: 'Price Updated', value: '25', icon: <IndianRupee />, color: '#43a047', bg: 'rgba(67, 160, 71, 0.15)' },
    { title: 'Sold Vehicles', value: '45', icon: <CarFront />, color: '#3949ab', bg: 'rgba(57, 73, 171, 0.15)' },
    { title: 'Cancelled Enquiries', value: '7', icon: <XCircle />, color: '#e53935', bg: 'rgba(229, 57, 53, 0.15)' },
];

const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.65)',
    backdropFilter: 'blur(28px) saturate(160%)',
    border: '1px solid rgba(255,255,255,0.7)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,1)',
    borderRadius: '32px',
    color: '#333',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,1)'
    }
};

export default function Dashboard() {
    return (
        <Box>
            <Grid container spacing={3}>
                {statCards.map((stat, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                        <Card sx={{ height: '100%', ...glassCardStyle }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Box>
                                        <Typography sx={{ color: 'rgba(0,0,0,0.6)' }} variant="subtitle2" fontWeight="600" gutterBottom>
                                            {stat.title}
                                        </Typography>
                                        <Typography variant="h4" fontWeight="bold" sx={{ color: '#333' }}>
                                            {stat.value}
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        p: 1.5,
                                        borderRadius: '16px',
                                        bgcolor: stat.bg,
                                        color: stat.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255,255,255,0.8)'
                                    }}>
                                        {stat.icon}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Enquiry Table placeholder on Dashboard */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" fontWeight="bold" mb={2} sx={{ color: '#333' }}>Recent Enquiries</Typography>
                <Card sx={{ p: 3, ...glassCardStyle }}>
                    <Typography sx={{ color: 'rgba(0,0,0,0.6)' }}>Go to 'My Enquiries' to view the full detailed list.</Typography>
                </Card>
            </Box>
        </Box>
    );
}
