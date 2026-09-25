import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box, Card, Typography, TextField, InputAdornment, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
    IconButton, Chip, Tabs, Tab, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { Search, Plus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

// mockEnquiries removed in favor of real data

const getStatusColor = (status) => {
    switch (status) {
        case 'Price Updated': return { bg: '#e8f5e9', color: '#2e7d32' };
        case 'Bidding In Progress': return { bg: '#f3e5f5', color: '#8e24aa' };
        case 'In Process': return { bg: '#fff3e0', color: '#fb8c00' };
        case 'New': return { bg: '#e3f2fd', color: '#1e88e5' };
        default: return { bg: '#f5f5f5', color: '#616161' };
    }
};

export default function MyEnquiries() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [enquiries, setEnquiries] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('all');
    const [statusFilter, setStatusFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [franchisesList, setFranchisesList] = useState([]);

    const fetchEnquiries = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/franchise/enquiries`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        page: page + 1, // backend typically expects 1-indexed page
                        limit: rowsPerPage,
                        ...(search && { search }),
                        ...(type !== 'all' && { type }),
                        ...(statusFilter && { status: statusFilter })
                    }
                }
            );
            setEnquiries(res.data?.data || res.data?.enquiries || []);
            setTotalCount(res.data?.pagination?.total || res.data?.total || res.data?.totalCount || res.data?.data?.length || 0);
        } catch (err) {
            console.error("Error fetching enquiries:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchEnquiries();
        }, 300); // debounce search
        return () => clearTimeout(timeoutId);
    }, [page, rowsPerPage, search, type, statusFilter]);

    useEffect(() => {
        const fetchAllFranchises = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/franchise/admin/all`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { limit: 100 }
                });
                const data = response.data?.data || response.data?.franchises || response.data || [];
                setFranchisesList(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching franchises for dropdown:", err);
            }
        };
        fetchAllFranchises();
    }, []);

    const handleAssign = async (enquiryId, franchiseId) => {
        if (!franchiseId) return;
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/franchise/admin/assign/${enquiryId}/${franchiseId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            fetchEnquiries();
        } catch (err) {
            console.error("Error assigning franchise:", err);
            alert(err.response?.data?.message || "Failed to assign franchise. You might not have admin permissions.");
        }
    };

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Card>
            <Box sx={{ p: 3, borderBottom: '1px solid #eee' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">My Enquiries</Typography>
                    <Button component={Link} to="/enquiries/create" variant="contained" color="primary" startIcon={<Plus size={18} />}>
                        Create Enquiry
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Tabs value={type} onChange={(e, newVal) => { setType(newVal); setPage(0); }} sx={{ minHeight: 40 }}>
                        <Tab label="All" value="all" sx={{ minHeight: 40, py: 0 }} />
                        <Tab label="Own Created" value="own" sx={{ minHeight: 40, py: 0 }} />
                        <Tab label="Assigned" value="assigned" sx={{ minHeight: 40, py: 0 }} />
                    </Tabs>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <FormControl size="small" sx={{ minWidth: 150 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={statusFilter}
                                label="Status"
                                onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}
                            >
                                <MenuItem value=""><em>All</em></MenuItem>
                                <MenuItem value="New">New</MenuItem>
                                <MenuItem value="Price Updated">Price Updated</MenuItem>
                                <MenuItem value="Bidding In Progress">Bidding In Progress</MenuItem>
                                <MenuItem value="In Process">In Process</MenuItem>
                            </Select>
                        </FormControl>
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

            <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead sx={{ bgcolor: '#f9fafb' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Enquiry ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Vehicle</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Assigned To</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Highest Bid</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Last Updated</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>Loading...</TableCell>
                            </TableRow>
                        ) : enquiries.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>No enquiries found.</TableCell>
                            </TableRow>
                        ) : (
                            enquiries.map((row) => {
                                const statusColor = getStatusColor(row.status);
                                // Default mapped fields since backend model might differ slightly
                                const id = row._id || row.id;
                                const customer = row.customerName || row.customer || 'Unknown';
                                const vehicle = row.vehicleName || row.vehicle || 'Unknown';

                                const assignedToId = (typeof row.assignedTo === 'object' && row.assignedTo) ? (row.assignedTo._id || row.assignedTo.id) : (row.assignedTo && typeof row.assignedTo === 'string' ? row.assignedTo : '');
                                const assignedToName = row.assignedToName || (typeof row.assignedTo === 'object' && row.assignedTo ? (row.assignedTo.name || row.assignedTo.firstName || row.assignedTo.franchiseName) : null) || 'Unassigned';

                                const highestBid = row.highestBid || 'N/A';
                                const lastUpdated = row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : (row.lastUpdated || 'N/A');

                                return (
                                    <TableRow key={id} hover>
                                        <TableCell sx={{ fontWeight: '600' }}>{row.enquiryId || id.slice(-6)}</TableCell>
                                        <TableCell>{customer}</TableCell>
                                        <TableCell>{vehicle}</TableCell>
                                        <TableCell>
                                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                                <Select
                                                    value={assignedToId}
                                                    onChange={(e) => handleAssign(id, e.target.value)}
                                                    displayEmpty
                                                    sx={{
                                                        '& .MuiSelect-select': { py: 0.5, fontSize: '0.875rem' },
                                                        borderRadius: 1
                                                    }}
                                                >
                                                    <MenuItem value=""><em>Unassigned</em></MenuItem>
                                                    {franchisesList.map(f => (
                                                        <MenuItem key={f._id || f.id} value={f._id || f.id}>
                                                            {f.name || f.franchiseName || f.firstName}
                                                        </MenuItem>
                                                    ))}
                                                    {assignedToId && !franchisesList.some(f => (f._id || f.id) === assignedToId) && (
                                                        <MenuItem value={assignedToId}>{assignedToName !== 'Unassigned' ? assignedToName : 'Unknown Franchise'}</MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={row.status}
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
                                        <TableCell>{lastUpdated}</TableCell>
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
