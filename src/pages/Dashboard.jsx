import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import {
    FileText, PlusSquare, Clock, Gavel, CheckCircle, IndianRupee, CarFront, XCircle
} from 'lucide-react';

const statCards = [
    { title: 'Total Enquiries', value: '142', icon: <FileText />, color: '#5e35b1', bg: '#ede7f6' },
    { title: 'New Enquiries', value: '12', icon: <PlusSquare />, color: '#1e88e5', bg: '#e3f2fd' },
    { title: 'In Process', value: '28', icon: <Clock />, color: '#fb8c00', bg: '#fff3e0' },
    { title: 'Bidding In Progress', value: '15', icon: <Gavel />, color: '#8e24aa', bg: '#f3e5f5' },
    { title: 'Highest Bid Received', value: '10', icon: <CheckCircle />, color: '#00897b', bg: '#e0f2f1' },
    { title: 'Price Updated', value: '25', icon: <IndianRupee />, color: '#43a047', bg: '#e8f5e9' },
    { title: 'Sold Vehicles', value: '45', icon: <CarFront />, color: '#3949ab', bg: '#e8eaf6' },
    { title: 'Cancelled Enquiries', value: '7', icon: <XCircle />, color: '#e53935', bg: '#ffebee' },
];

export default function Dashboard() {
    return (
        <Box>
            <Grid container spacing={3}>
                {statCards.map((stat, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Box>
                                        <Typography color="text.secondary" variant="subtitle2" fontWeight="600" gutterBottom>
                                            {stat.title}
                                        </Typography>
                                        <Typography variant="h4" fontWeight="bold" color="text.primary">
                                            {stat.value}
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        p: 1.5,
                                        borderRadius: 2,
                                        bgcolor: stat.bg,
                                        color: stat.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
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
                <Typography variant="h6" fontWeight="bold" mb={2}>Recent Enquiries</Typography>
                <Card sx={{ p: 3 }}>
                    <Typography color="text.secondary">Go to 'My Enquiries' to view the full detailed list.</Typography>
                </Card>
            </Box>
        </Box>
    );
}
