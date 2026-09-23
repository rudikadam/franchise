import React, { useState } from 'react';
import { Box, Card, Typography, Grid, Chip, Tabs, Tab, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';

const priceHistory = [
    { date: '18 Aug 2026, 12:00 PM', prevPrice: '₹4,35,000', newPrice: '₹4,50,000', updatedBy: 'PA Team' },
    { date: '18 Aug 2026, 11:30 AM', prevPrice: '₹4,20,000', newPrice: '₹4,35,000', updatedBy: 'PA Team' },
];

export default function EnquiryDetails() {
    const [tabValue, setTabValue] = useState(0);
    const navigate = useNavigate();

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'transparent', p: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ mr: 2, bgcolor: 'white', border: '1px solid #e0e0e0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <ArrowBackIcon fontSize="small" color="action" />
                </IconButton>
                <Typography variant="h5" fontWeight="bold">Enquiry Details</Typography>
            </Box>
            {/* Tabs Section */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            minHeight: '48px',
                            color: 'text.secondary',
                        },
                        '& .Mui-selected': {
                            color: '#1976d2',
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#1976d2',
                            height: '3px',
                            borderRadius: '3px 3px 0 0',
                        }
                    }}
                >
                    <Tab icon={<DescriptionOutlinedIcon fontSize="small" />} iconPosition="start" label="Details" />
                    <Tab icon={<ReceiptOutlinedIcon fontSize="small" />} iconPosition="start" label="Price History" />
                    <Tab icon={<LocalShippingOutlinedIcon fontSize="small" />} iconPosition="start" label="Status" />
                </Tabs>
            </Box>

            {/* Details Content */}
            {tabValue === 0 && (
                <Card variant="outlined" sx={{ borderRadius: 2, borderColor: '#e0e0e0', boxShadow: 'none' }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, borderBottom: '1px solid #f0f0f0', backgroundColor: '#fdfcfc' }}>
                        <Typography variant="subtitle1" fontWeight="bold" color="text.primary">Enquiry BND-10025</Typography>
                        <Chip label="Price Updated" color="success" size="small" sx={{ fontWeight: 600, borderRadius: '4px' }} />
                    </Box>

                    <Box sx={{ p: 4 }}>
                        {/* Quick Info Bar */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 6 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PersonOutlineOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">Rahul Sharma</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <SmartphoneOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">+91 9876543210</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DirectionsCarOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">Tata Harrier XT+ (2021)</Typography>
                            </Box>
                        </Box>

                        <Grid container spacing={4}>
                            {/* Vehicle Details */}
                            <Grid item xs={12} md={4}>
                                <Typography variant="subtitle1" fontWeight="bold" mb={2} color="text.primary">Vehicle Details</Typography>

                                <Box display="flex" mb={1} alignItems="center">
                                    <Typography variant="body2" color="text.primary" width="140px">Make / Model :</Typography>
                                    <Typography variant="body2" color="text.secondary">Tata Harrier XT+</Typography>
                                </Box>
                                <Box display="flex" mb={1} alignItems="center">
                                    <Typography variant="body2" color="text.primary" width="140px">Year :</Typography>
                                    <Typography variant="body2" color="text.secondary">2021</Typography>
                                </Box>
                                <Box display="flex" mb={1} alignItems="center">
                                    <Typography variant="body2" color="text.primary" width="140px">Registration No :</Typography>
                                    <Typography variant="body2" color="text.secondary">MH-02-AB-1234</Typography>
                                </Box>
                                <Box display="flex" mb={1} alignItems="center">
                                    <Typography variant="body2" color="text.primary" width="140px">Fuel Type :</Typography>
                                    <Typography variant="body2" color="text.secondary">Diesel</Typography>
                                </Box>
                            </Grid>

                            {/* Customer Details */}
                            <Grid item xs={12} md={4}>
                                <Typography variant="subtitle1" fontWeight="bold" mb={2} color="text.primary">Customer Details</Typography>

                                <Box display="flex" mb={1} alignItems="center">
                                    <Typography variant="body2" color="text.primary" width="120px">Name :</Typography>
                                    <Typography variant="body2" color="text.secondary">Rahul Sharma</Typography>
                                </Box>
                                <Box display="flex" mb={1} alignItems="center">
                                    <Typography variant="body2" color="text.primary" width="120px">Mobile :</Typography>
                                    <Typography variant="body2" color="text.secondary">+91 9876543210</Typography>
                                </Box>
                                <Box display="flex" mb={1} alignItems="center">
                                    <Typography variant="body2" color="text.primary" width="120px">City :</Typography>
                                    <Typography variant="body2" color="text.secondary">Mumbai</Typography>
                                </Box>
                            </Grid>

                            {/* Bidding Info */}
                            <Grid item xs={12} md={4}>
                                <Typography variant="subtitle1" fontWeight="bold" mb={2} color="text.primary">Bidding Status</Typography>
                                <Box sx={{ bgcolor: '#f4f6f8', p: 2, borderRadius: 2, border: '1px solid #e0e0e0' }}>
                                    <Typography variant="body2" color="text.secondary" mb={0.5}>Highest Bid</Typography>
                                    <Typography variant="h5" color="primary" fontWeight="bold">₹ 4,50,000</Typography>
                                    <Typography variant="caption" color="text.secondary" display="block" mt={1}>Last Updated: 18 Aug 2026, 12:30 PM</Typography>

                                    <Box mt={2} p={1.5} bgcolor="white" borderRadius={1} border="1px solid #ccc">
                                        <Typography variant="caption" color="error.main" fontWeight="bold" display="block">Note</Typography>
                                        <Typography variant="caption" sx={{ lineHeight: 1.2, display: 'block', mt: 0.5 }}>The bid price is managed by the Bidding Team and Bid N Drive admins. Direct modifications are restricted.</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            )}

            {/* Price History Content */}
            {tabValue === 1 && (
                <Card variant="outlined" sx={{ borderRadius: 2, borderColor: '#e0e0e0', boxShadow: 'none', p: 4 }}>
                    <Typography variant="h6" fontWeight="bold" mb={3} color="text.primary">Price History</Typography>
                    {priceHistory.map((history, index) => (
                        <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: index < priceHistory.length - 1 ? '1px solid #eee' : 'none' }}>
                            <Typography variant="subtitle2" fontWeight="bold">{history.newPrice}</Typography>
                            <Typography variant="body2" color="text.secondary" display="block">Previous: {history.prevPrice}</Typography>
                            <Typography variant="caption" color="text.disabled">{history.date} • {history.updatedBy}</Typography>
                        </Box>
                    ))}
                </Card>
            )}
        </Box>
    );
}
