import { useState, useEffect } from 'react';
import {
    Box, Card, CardContent, Typography, Grid, TextField, Button,
    Snackbar, Alert, CircularProgress, IconButton, Tabs, Tab,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
    InputAdornment, Chip
} from '@mui/material';
import { Camera, X, Upload, Search, Plus, List as ListIcon } from 'lucide-react';
import apiClient from '../services/apiClient';

export default function FranchiseCars() {
    const [tab, setTab] = useState(0); // 0 for list, 1 for create
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // --- LIST STATE ---
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [cars, setCars] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [search, setSearch] = useState('');
    const [listLoading, setListLoading] = useState(true);

    // --- CREATE FORM STATE ---
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: '',
        registrationNumber: '',
        specifications: '',
        expectedPrice: '',
        city: '',
        state: ''
    });
    const [carImages, setCarImages] = useState([]);
    const [createLoading, setCreateLoading] = useState(false);

    // --- LIST FETCHING ---
    const fetchCars = async () => {
        setListLoading(true);
        try {
            const res = await apiClient.get('/api/franchise/cars', {
                params: {
                    page: page + 1,
                    limit: rowsPerPage,
                    ...(search && { search })
                }
            });
            const carsData = res.data?.data || res.data?.cars || res.data || [];
            setCars(Array.isArray(carsData) ? carsData : []);
            setTotalCount(res.data?.pagination?.total || res.data?.total || res.data?.totalCount || (Array.isArray(carsData) ? carsData.length : 0));
        } catch (err) {
            console.error("Error fetching cars:", err);
            setSnackbar({ open: true, message: 'Failed to fetch cars.', severity: 'error' });
        } finally {
            setListLoading(false);
        }
    };

    useEffect(() => {
        if (tab === 0) {
            const timeoutId = setTimeout(() => {
                fetchCars();
            }, 300);
            return () => clearTimeout(timeoutId);
        }
    }, [tab, page, rowsPerPage, search]);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // --- CREATE FORM HANDLERS ---
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setCarImages(prev => [...prev, ...files]);
        }
    };

    const removeImage = (index) => {
        setCarImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (carImages.length === 0) {
            setSnackbar({ open: true, message: 'Please select at least one car image.', severity: 'error' });
            return;
        }

        setCreateLoading(true);

        try {
            const data = new FormData();

            const basicDetails = {
                make: formData.make,
                model: formData.model,
                year: formData.year,
                registrationNumber: formData.registrationNumber
            };
            data.append('basicDetails', JSON.stringify(basicDetails));
            data.append('specifications', JSON.stringify({ details: formData.specifications }));

            const sellingDetails = {
                expectedPrice: formData.expectedPrice,
                city: formData.city,
                state: formData.state
            };
            data.append('sellingDetails', JSON.stringify(sellingDetails));

            carImages.forEach((img) => data.append('carImages', img));

            await apiClient.post('/api/franchise/cars', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setSnackbar({ open: true, message: 'Car listing created successfully!', severity: 'success' });

            // Reset form
            setFormData({
                make: '', model: '', year: '', registrationNumber: '',
                specifications: '', expectedPrice: '', city: '', state: ''
            });
            setCarImages([]);

            // Switch back to list tab
            setTab(0);
        } catch (error) {
            console.error('Error creating car listing:', error);
            const errMsg = error.response?.data?.message || 'Failed to create car listing. Please try again.';
            setSnackbar({ open: true, message: errMsg, severity: 'error' });
        } finally {
            setCreateLoading(false);
        }
    };

    const handleCloseSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }));

    return (
        <Box sx={{ p: 1 }}>
            <Box sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)}>
                    <Tab
                        icon={<ListIcon size={18} style={{ marginBottom: 0, marginRight: 8, display: 'inline-block', verticalAlign: 'middle' }} />}
                        iconPosition="start"
                        label="My Cars"
                    />
                    <Tab
                        icon={<Plus size={18} style={{ marginBottom: 0, marginRight: 8, display: 'inline-block', verticalAlign: 'middle' }} />}
                        iconPosition="start"
                        label="Create Car Listing"
                    />
                </Tabs>
            </Box>

            {tab === 0 && (
                <Card>
                    <Box sx={{ p: 3, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight="bold">My Cars</Typography>
                        <TextField
                            size="small"
                            placeholder="Search cars..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search size={18} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <TableContainer>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHead sx={{ bgcolor: '#f9fafb' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Make</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Model</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Year</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Reg No.</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>City</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center" sx={{ py: 3 }}><CircularProgress size={24} /></TableCell>
                                    </TableRow>
                                ) : cars.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center" sx={{ py: 3 }}>No cars found.</TableCell>
                                    </TableRow>
                                ) : (
                                    cars.map((car, index) => {
                                        const id = car._id || car.id || '';
                                        let basic = car.basicDetails;
                                        if (typeof basic === 'string') {
                                            try { basic = JSON.parse(basic); } catch (e) { }
                                        }
                                        let selling = car.sellingDetails;
                                        if (typeof selling === 'string') {
                                            try { selling = JSON.parse(selling); } catch (e) { }
                                        }

                                        const make = basic?.make || car.make || 'N/A';
                                        const model = basic?.model || car.model || 'N/A';
                                        const year = basic?.year || car.year || 'N/A';
                                        const regNo = basic?.registrationNumber || car.registrationNumber || 'N/A';
                                        const price = selling?.expectedPrice || car.expectedPrice || 'N/A';
                                        const city = selling?.city || car.city || 'N/A';
                                        const status = car.status || 'Active';

                                        return (
                                            <TableRow key={id || index} hover>
                                                <TableCell>{id ? String(id).slice(-6).toUpperCase() : 'N/A'}</TableCell>
                                                <TableCell>{make}</TableCell>
                                                <TableCell>{model}</TableCell>
                                                <TableCell>{year}</TableCell>
                                                <TableCell>{regNo}</TableCell>
                                                <TableCell>₹{price}</TableCell>
                                                <TableCell>{city}</TableCell>
                                                <TableCell>
                                                    <Chip label={status} size="small" color={status === 'Active' ? 'success' : 'default'} />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            )}

            {tab === 1 && (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2 }}>Basic Details</Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth label="Make" name="make"
                                                value={formData.make} onChange={handleFormChange}
                                                required size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth label="Model" name="model"
                                                value={formData.model} onChange={handleFormChange}
                                                required size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth label="Year" name="year" type="number"
                                                value={formData.year} onChange={handleFormChange}
                                                required size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth label="Registration Number" name="registrationNumber"
                                                value={formData.registrationNumber} onChange={handleFormChange}
                                                required size="small"
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2 }}>Selling Details & Specs</Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                fullWidth label="Expected Price (₹)" name="expectedPrice" type="number"
                                                value={formData.expectedPrice} onChange={handleFormChange}
                                                required size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                fullWidth label="City" name="city"
                                                value={formData.city} onChange={handleFormChange}
                                                required size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                fullWidth label="State" name="state"
                                                value={formData.state} onChange={handleFormChange}
                                                required size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth label="Specifications" name="specifications"
                                                value={formData.specifications} onChange={handleFormChange}
                                                multiline rows={2}
                                                placeholder="Engine type, fuel, mileage, color, etc."
                                                size="small"
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Camera size={20} /> Car Images
                                    </Typography>

                                    <Box
                                        sx={{
                                            border: '2px dashed', borderColor: 'text.secondary', borderRadius: 2, p: 3,
                                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                                            bgcolor: 'rgba(0,0,0,0.02)', cursor: 'pointer', mb: 3
                                        }}
                                        component="label"
                                    >
                                        <input type="file" hidden multiple accept="image/*" onChange={handleImageChange} />
                                        <Upload size={32} color="#666" style={{ marginBottom: '8px' }} />
                                        <Typography variant="body1" color="text.secondary">
                                            Click to upload multiple images
                                        </Typography>
                                    </Box>

                                    {carImages.length > 0 && (
                                        <Grid container spacing={2}>
                                            {carImages.map((file, idx) => (
                                                <Grid item xs={6} sm={4} md={2} key={idx}>
                                                    <Box sx={{ position: 'relative', paddingTop: '75%', borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
                                                        <img
                                                            src={URL.createObjectURL(file)} alt={`Car preview ${idx}`}
                                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />
                                                        <IconButton
                                                            size="small" onClick={() => removeImage(idx)}
                                                            sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'white' } }}
                                                        >
                                                            <X size={16} color="red" />
                                                        </IconButton>
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            type="submit" variant="contained" disabled={createLoading}
                            startIcon={createLoading ? <CircularProgress size={20} color="inherit" /> : null}
                            sx={{ px: 4, py: 1.5, borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold' }}
                        >
                            {createLoading ? 'Submitting...' : 'Create Car Listing'}
                        </Button>
                    </Box>
                </form>
            )}

            <Snackbar
                open={snackbar.open} autoHideDuration={6000}
                onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
