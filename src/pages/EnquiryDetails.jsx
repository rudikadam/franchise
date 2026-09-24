import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Grid, Chip, Tabs, Tab, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import axios from 'axios';

export default function EnquiryDetails() {
    const [tabValue, setTabValue] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [enquiry, setEnquiry] = useState(location.state?.enquiry || null);
    const [loading, setLoading] = useState(!location.state?.enquiry);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (enquiry) return; // Do not fetch if available from router state

        const fetchEnquiry = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/franchise/enquiries/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                // Handle different response structures if data is wrapped
                const fetchedEnquiry = res.data?.data || res.data?.enquiry || res.data;
                setEnquiry(fetchedEnquiry);
            } catch (err) {
                console.error("Error fetching enquiry:", err);
                setError(err.response?.data?.message || err.message || "Failed to load enquiry details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchEnquiry();
    }, [id]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error || !enquiry) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="60vh" flexDirection="column">
                <Typography variant="h6" color="error">{error || "Enquiry not found"}</Typography>
                <IconButton onClick={() => navigate(-1)} sx={{ mt: 2 }}>
                    <ArrowBackIcon /> Back
                </IconButton>
            </Box>
        );
    }

    // Default fallbacks for data
    const enquiryId = enquiry.enquiryId || "N/A";
    const status = enquiry.status || "New";
    const highestBid = enquiry.highestBid || "N/A";

    // Parse car details
    let car = {};
    if (typeof enquiry.carDetails === 'string') {
        try { car = JSON.parse(enquiry.carDetails); } catch (e) { }
    } else if (enquiry.carDetails) {
        car = enquiry.carDetails;
    }

    let selling = {};
    if (typeof enquiry.sellingDetails === 'string') {
        try { selling = JSON.parse(enquiry.sellingDetails); } catch (e) { }
    } else if (enquiry.sellingDetails) {
        selling = enquiry.sellingDetails;
    }

    const customerName = enquiry.customerName || "N/A";
    const contactNumber = enquiry.contactNumber || enquiry.customerMobile || "N/A";
    const makeModel = car.model ? `${car.make || ""} ${car.model || ""}`.trim() : (enquiry.vehicleName || "N/A");
    const year = car.year || "N/A";
    const regNo = car.registrationNumber || "N/A";
    const fuelType = car.fuelType || selling.fuelType || "N/A";
    const city = selling.city || "N/A";
    const lastUpdated = enquiry.updatedAt ? new Date(enquiry.updatedAt).toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }) : "N/A";

    const priceHistory = enquiry.priceHistory || [];

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
                        <Typography variant="subtitle1" fontWeight="bold" color="text.primary">Enquiry {enquiryId}</Typography>
                        <Chip label={status} color="primary" size="small" sx={{ fontWeight: 600, borderRadius: '4px' }} />
                    </Box>

                    <Box sx={{ p: 4 }}>
                        {/* Quick Info Bar */}
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, mb: 6 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <PersonOutlineOutlinedIcon fontSize="medium" sx={{ color: 'text.secondary' }} />
                                <Typography variant="body1" fontWeight="medium" color="text.secondary">{customerName}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <SmartphoneOutlinedIcon fontSize="medium" sx={{ color: 'text.secondary' }} />
                                <Typography variant="body1" fontWeight="medium" color="text.secondary">{contactNumber}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <DirectionsCarOutlinedIcon fontSize="medium" sx={{ color: 'text.secondary' }} />
                                <Typography variant="body1" fontWeight="medium" color="text.secondary">{makeModel}</Typography>
                            </Box>
                        </Box>

                        <Grid container spacing={4}>
                            {/* Vehicle Details */}
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" fontWeight="bold" mb={3} color="text.primary">Vehicle Details</Typography>

                                <Box display="flex" mb={2} alignItems="center">
                                    <Typography variant="body1" color="text.primary" width="150px" fontWeight="500">Make / Model :</Typography>
                                    <Typography variant="body1" color="text.secondary">{makeModel}</Typography>
                                </Box>
                                <Box display="flex" mb={2} alignItems="center">
                                    <Typography variant="body1" color="text.primary" width="150px" fontWeight="500">Year :</Typography>
                                    <Typography variant="body1" color="text.secondary">{year}</Typography>
                                </Box>
                                <Box display="flex" mb={2} alignItems="center">
                                    <Typography variant="body1" color="text.primary" width="150px" fontWeight="500">Registration No :</Typography>
                                    <Typography variant="body1" color="text.secondary">{regNo}</Typography>
                                </Box>
                                <Box display="flex" mb={2} alignItems="center">
                                    <Typography variant="body1" color="text.primary" width="150px" fontWeight="500">Fuel Type :</Typography>
                                    <Typography variant="body1" color="text.secondary">{fuelType}</Typography>
                                </Box>
                            </Grid>

                            {/* Customer Details */}
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" fontWeight="bold" mb={3} color="text.primary">Customer Details</Typography>

                                <Box display="flex" mb={2} alignItems="center">
                                    <Typography variant="body1" color="text.primary" width="120px" fontWeight="500">Name :</Typography>
                                    <Typography variant="body1" color="text.secondary">{customerName}</Typography>
                                </Box>
                                <Box display="flex" mb={2} alignItems="center">
                                    <Typography variant="body1" color="text.primary" width="120px" fontWeight="500">Mobile :</Typography>
                                    <Typography variant="body1" color="text.secondary">{contactNumber}</Typography>
                                </Box>
                                <Box display="flex" mb={2} alignItems="center">
                                    <Typography variant="body1" color="text.primary" width="120px" fontWeight="500">City :</Typography>
                                    <Typography variant="body1" color="text.secondary">{city}</Typography>
                                </Box>
                            </Grid>

                            {/* Bidding Info */}
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" fontWeight="bold" mb={3} color="text.primary">Bidding Status</Typography>
                                <Box sx={{ bgcolor: '#f4f6f8', p: 3, borderRadius: 2, border: '1px solid #e0e0e0' }}>
                                    <Typography variant="body1" color="text.secondary" mb={1} fontWeight="500">Highest Bid</Typography>
                                    <Typography variant="h4" color="primary" fontWeight="bold">{highestBid}</Typography>
                                    <Typography variant="body2" color="text.secondary" display="block" mt={1.5}>Last Updated: {lastUpdated}</Typography>

                                    <Box mt={3} p={2} bgcolor="white" borderRadius={1} border="1px solid #ccc">
                                        <Typography variant="body2" color="error.main" fontWeight="bold" display="block">Note</Typography>
                                        <Typography variant="body2" sx={{ lineHeight: 1.4, display: 'block', mt: 1 }}>The bid price is managed by the Bidding Team and Bid N Drive admins. Direct modifications are restricted.</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            )}

            {/* Price History Content */}
            {tabValue === 1 && (
                <Card variant="outlined" sx={{ borderRadius: 2, borderColor: '#e0e0e0', boxShadow: 'none', p: 5 }}>
                    <Typography variant="h5" fontWeight="bold" mb={4} color="text.primary">Price History</Typography>
                    {priceHistory.length > 0 ? priceHistory.map((history, index) => (
                        <Box key={index} sx={{ mb: 3, pb: 3, borderBottom: index < priceHistory.length - 1 ? '1px solid #eee' : 'none' }}>
                            <Typography variant="subtitle1" fontWeight="bold">{history.newPrice || history.bidAmount}</Typography>
                            {history.prevPrice && <Typography variant="body1" color="text.secondary" display="block" sx={{ mt: 0.5 }}>Previous: {history.prevPrice}</Typography>}
                            <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>{new Date(history.date || history.createdAt || history.updatedAt).toLocaleString()} • {history.updatedBy || history.bidderName || "System"}</Typography>
                        </Box>
                    )) : (
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>No price history available.</Typography>
                    )}
                </Card>
            )}

            {/* Status Content */}
            {tabValue === 2 && (
                <Card variant="outlined" sx={{ borderRadius: 2, borderColor: '#e0e0e0', boxShadow: 'none', p: 4 }}>
                    <Typography variant="h6" fontWeight="bold" mb={3} color="text.primary">Status Information</Typography>
                    <Typography variant="body2" color="text.secondary">Current Status: <Chip label={status} size="small" /></Typography>
                </Card>
            )}
        </Box>
    );
}
