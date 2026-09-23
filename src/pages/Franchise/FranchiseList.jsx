import { useState } from 'react';
import {
    Box, Card, Typography, TextField, InputAdornment, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
    IconButton, Chip, Menu, MenuItem
} from '@mui/material';
import { Search, Plus, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockFranchises = [
    { id: 'FR-001', name: 'Metro Motors', owner: 'Rahul Sharma', phone: '+91 9876543210', city: 'Mumbai', status: 'Active', date: '2026-01-15' },
    { id: 'FR-002', name: 'North India Auto', owner: 'Amit Singh', phone: '+91 8765432109', city: 'Delhi', status: 'Active', date: '2026-02-20' },
    { id: 'FR-003', name: 'South Cars Hub', owner: 'Karthik Raja', phone: '+91 7654321098', city: 'Chennai', status: 'Inactive', date: '2026-03-10' },
    { id: 'FR-004', name: 'East Side Wheels', owner: 'Sanjay Das', phone: '+91 6543210987', city: 'Kolkata', status: 'Active', date: '2026-04-05' },
    { id: 'FR-005', name: 'Central Auto', owner: 'Vijay Kumar', phone: '+91 5432109876', city: 'Bhopal', status: 'Active', date: '2026-05-12' },
];

export default function FranchiseList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Card>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
                <Typography variant="h6" fontWeight="bold">Franchise List</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        size="small"
                        placeholder="Search franchises..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={18} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button variant="contained" color="primary" startIcon={<Plus size={18} />}>
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
                        {mockFranchises.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight="600">{row.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">{row.phone}</Typography>
                                </TableCell>
                                <TableCell>{row.owner}</TableCell>
                                <TableCell>{row.city}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={row.status}
                                        size="small"
                                        sx={{
                                            bgcolor: row.status === 'Active' ? '#e8f5e9' : '#ffebee',
                                            color: row.status === 'Active' ? '#2e7d32' : '#c62828',
                                            fontWeight: 600
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={handleMenuClick} size="small">
                                        <MoreVertical size={18} />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
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
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={mockFranchises.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    );
}
