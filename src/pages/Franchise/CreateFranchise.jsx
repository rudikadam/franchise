import { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, IconButton, Snackbar, Alert, CircularProgress } from '@mui/material';
import { Upload, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';

export default function CreateFranchise() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [formData, setFormData] = useState({
        franchiseName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        state: '',
        city: '',
        gstNumber: '',
        profileImage: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await apiClient.post('/franchise/admin/create', formData);
            setSnackbar({ open: true, message: 'Franchise created successfully!', severity: 'success' });
            setTimeout(() => {
                navigate('/admin/franchises');
            }, 1500);
        } catch (error) {
            console.error('Error creating franchise:', error);
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Failed to create franchise',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }));

    const glassStyle = {
        background: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(28px) saturate(160%)',
        border: '1px solid rgba(255, 255, 255, 0.7)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,1)',
        borderRadius: '24px',
        p: 4,
        mb: 4
    };

    return (
        <Box sx={{ maxWidth: 1000, margin: '0 auto', pb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
                <IconButton onClick={() => navigate('/admin/franchises')} sx={{ bgcolor: 'rgba(255,255,255,0.5)', '&:hover': { bgcolor: 'rgba(255,255,255,0.8)' } }}>
                    <ArrowLeft size={24} color="#333" />
                </IconButton>
                <Typography variant="h4" fontWeight="bold" color="#333">Create Franchise Account</Typography>
            </Box>

            <form onSubmit={handleSubmit}>
                <Box sx={glassStyle}>
                    <Typography variant="h6" fontWeight="bold" mb={3} color="primary">Basic Details</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required fullWidth label="Franchise Name" name="franchiseName"
                                value={formData.franchiseName} onChange={handleChange}
                                variant="outlined" size="medium"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required fullWidth label="First Name" name="firstName"
                                value={formData.firstName} onChange={handleChange}
                                variant="outlined" size="medium"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth label="Last Name" name="lastName"
                                value={formData.lastName} onChange={handleChange}
                                variant="outlined" size="medium"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required fullWidth label="Email Address" name="email" type="email"
                                value={formData.email} onChange={handleChange}
                                variant="outlined" size="medium"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required fullWidth label="Password" name="password" type="password"
                                value={formData.password} onChange={handleChange}
                                variant="outlined" size="medium"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth label="Phone Number" name="phone"
                                value={formData.phone} onChange={handleChange}
                                variant="outlined" size="medium"
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={glassStyle}>
                    <Typography variant="h6" fontWeight="bold" mb={3} color="primary">Location & GST</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth label="Address" name="address"
                                value={formData.address} onChange={handleChange}
                                variant="outlined" size="medium" multiline rows={2}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth label="State" name="state"
                                value={formData.state} onChange={handleChange}
                                variant="outlined" size="medium"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required fullWidth label="City" name="city"
                                value={formData.city} onChange={handleChange}
                                variant="outlined" size="medium"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth label="GST Number" name="gstNumber"
                                value={formData.gstNumber} onChange={handleChange}
                                variant="outlined" size="medium"
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={glassStyle}>
                    <Typography variant="h6" fontWeight="bold" mb={3} color="primary">Profile Image (Optional)</Typography>
                    <Box
                        sx={{
                            border: '2px dashed rgba(94, 53, 177, 0.4)',
                            borderRadius: '16px',
                            p: 4,
                            textAlign: 'center',
                            bgcolor: 'rgba(255,255,255,0.4)',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.7)', borderColor: 'primary.main' }
                        }}
                    >
                        <Upload size={32} color="#5e35b1" style={{ margin: '0 auto', marginBottom: 8 }} />
                        <Typography variant="subtitle1" fontWeight="500" color="#333">Click or drag image here to upload</Typography>
                        <Typography variant="caption" color="text.secondary">PNG, JPG or JPEG (Max 2MB)</Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        size="large"
                        onClick={() => navigate('/admin/franchises')}
                        sx={{ borderRadius: '12px', px: 4, fontWeight: 'bold' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={loading}
                        sx={{ borderRadius: '12px', px: 4, fontWeight: 'bold', boxShadow: '0 8px 16px rgba(94, 53, 177, 0.3)' }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Franchise'}
                    </Button>
                </Box>
            </form>

            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%', borderRadius: '12px' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
