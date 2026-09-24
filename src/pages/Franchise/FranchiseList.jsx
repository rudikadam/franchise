import { useState, useEffect } from 'react';
import {
    Box, Card, Typography, TextField, InputAdornment, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
    IconButton, Chip, Menu, MenuItem, CircularProgress
} from '@mui/material';
import { Search, Plus, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiClient';

export default function FranchiseList() {
    const [franchises, setFranchises] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFranchiseId, setSelectedFranchiseId] = useState(null);

    const handleMenuClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedFranchiseId(id);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedFranchiseId(null);
    };

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        const fetchFranchises = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get('/franchise/admin/all', {
                    params: {
                        page: page + 1,
                        limit: rowsPerPage,
                        search: searchTerm || undefined,
                    }
                });

                const data = response.data?.data || response.data?.franchises || response.data || [];
                const total = response.data?.pagination?.total || response.data?.totalCount || response.data?.total || data.length || 0;

                setFranchises(data);
                setTotalCount(total);
            } catch (error) {
                console.error('Failed to fetch franchises:', error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchFranchises();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [page, rowsPerPage, searchTerm]);

    return (
        <Card>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
                <Typography variant="h6" fontWeight="bold">Franchise List</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        size="small"
                        placeholder="Search franchises..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(0);
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={18} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button component={Link} to="/admin/franchises/create" variant="contained" color="primary" startIcon={<Plus size={18} />}>
                        Add Franchise
                    </Button>
                </Box>
            </Box>

            <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead sx={{ bgcolor: '#f9fafb' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Franchise Name</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Owner</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>City</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : franchises.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        No franchises found.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            franchises.map((row) => {
                                const isActive = row.isActive === true || row.isActive === 'true' || row.status === 'Active';
                                const rowId = row._id || row.id;
                                return (
                                    <TableRow key={rowId} hover>
                                        <TableCell>{row.franchiseId || row.id || (row._id && row._id.slice(-6).toUpperCase())}</TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight="600">{row.name || row.franchiseName || 'N/A'}</Typography>
                                            <Typography variant="body2" color="text.secondary">{row.phone || row.mobileNumber || 'N/A'}</Typography>
                                        </TableCell>
                                        <TableCell>{row.owner || row.ownerName || 'N/A'}</TableCell>
                                        <TableCell>{row.city || row.location?.city || 'N/A'}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={isActive ? 'Active' : 'Inactive'}
                                                size="small"
                                                sx={{
                                                    bgcolor: isActive ? '#e8f5e9' : '#ffebee',
                                                    color: isActive ? '#2e7d32' : '#c62828',
                                                    fontWeight: 600
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={(e) => handleMenuClick(e, rowId)} size="small">
                                                <MoreVertical size={18} />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl && selectedFranchiseId === rowId ? anchorEl : null}
                                                open={Boolean(anchorEl && selectedFranchiseId === rowId)}
                                                onClose={handleMenuClose}
                                                sx={{ '& .MuiPaper-root': { borderRadius: 2, minWidth: 150 } }}
                                            >
                                                <MenuItem onClick={handleMenuClose}><Eye size={16} className="mr-2" /> View</MenuItem>
                                                <MenuItem onClick={handleMenuClose}><Edit size={16} className="mr-2" /> Edit</MenuItem>
                                                <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
                                                    <Trash2 size={16} className="mr-2" /> Delete
                                                </MenuItem>
                                            </Menu>
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
