import { useState, useEffect } from 'react';
import {
    Box, Card, Typography, TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
    Chip, CircularProgress, IconButton, Alert
} from '@mui/material';
import { Search, Eye } from 'lucide-react';
import apiClient from '../services/apiClient';
import { Link } from 'react-router-dom';

const getStatusColor = (status) => {
    switch (status) {
        case 'Price Updated': return { bg: '#e8f5e9', color: '#2e7d32' };
        case 'Bidding In Progress': return { bg: '#f3e5f5', color: '#8e24aa' };
        case 'In Process': return { bg: '#fff3e0', color: '#fb8c00' };
        case 'New': return { bg: '#e3f2fd', color: '#1e88e5' };
        default: return { bg: '#f5f5f5', color: '#616161' };
    }
};

export default function CarEnquiries() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [enquiries, setEnquiries] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchEnquiries = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await apiClient.get('/api/car-enquiries/franchise', {
                params: {
                    page: page + 1,
                    limit: rowsPerPage,
                    ...(search && { search })
                }
            });
            const enquiriesData = res.data?.data || res.data?.carEnquiries || res.data?.enquiries || res.data || [];
            setEnquiries(Array.isArray(enquiriesData) ? enquiriesData : []);
            setTotalCount(res.data?.pagination?.total || res.data?.total || res.data?.totalCount || (Array.isArray(enquiriesData) ? enquiriesData.length : 0));
        } catch (err) {
            console.error("Error fetching car enquiries:", err);
            setError(err.response?.data?.message || 'Failed to load car enquiries.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchEnquiries();
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [page, rowsPerPage, search]);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Card>
            <Box sx={{ p: 3, borderBottom: '1px solid #eee' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">Car Enquiries</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            size="small"
                            placeholder="Search enquiries..."
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
                </Box>
            </Box>

            {error && (
                <Box sx={{ p: 2 }}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            )}

            <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead sx={{ bgcolor: '#f9fafb' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Enquiry ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Vehicle</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Highest Bid</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 3 }}><CircularProgress size={24} /></TableCell>
                            </TableRow>
                        ) : enquiries.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>No car enquiries found.</TableCell>
                            </TableRow>
                        ) : (
                            enquiries.map((row) => {
                                const id = row._id || row.id;
                                const customerInfo = row.customerId || row.customer;
                                const customer = customerInfo?.name || customerInfo?.firstName || row.customerName || 'Unknown';

                                let carDetailsObj = row.carDetails || (row.carId ? row.carId.basicDetails : null);
                                if (typeof carDetailsObj === 'string') {
                                    try { carDetailsObj = JSON.parse(carDetailsObj); } catch (e) { }
                                }
                                const make = carDetailsObj?.make || '';
                                const model = carDetailsObj?.model || '';
                                const year = carDetailsObj?.year || '';
                                const vehicle = [make, model, year].filter(Boolean).join(' ') || row.vehicleName || 'Unknown';

                                const statusColor = getStatusColor(row.status);
                                const highestBid = row.highestBid || 'N/A';
                                const date = row.createdAt ? new Date(row.createdAt).toLocaleDateString() : (row.date || 'N/A');

                                return (
                                    <TableRow key={id} hover>
                                        <TableCell sx={{ fontWeight: '600' }}>{row.enquiryId || (id ? String(id).slice(-6).toUpperCase() : '')}</TableCell>
                                        <TableCell>{customer}</TableCell>
                                        <TableCell>{vehicle}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={row.status || 'New'}
                                                size="small"
                                                sx={{
                                                    bgcolor: statusColor.bg,
                                                    color: statusColor.color,
                                                    fontWeight: 600
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: highestBid !== 'N/A' ? 'bold' : 'normal' }}>
                                            {highestBid}
                                        </TableCell>
                                        <TableCell>{date}</TableCell>
                                        <TableCell align="right">
                                            <IconButton component={Link} to={`/enquiries/${id}`} state={{ enquiry: row }} size="small">
                                                <Eye size={18} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
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
    );
}
