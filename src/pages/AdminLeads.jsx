import { useState } from 'react';
import {
    Box, Card, Typography, TextField, InputAdornment, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
    IconButton, Chip, Menu, MenuItem
} from '@mui/material';
import { Search, Filter, MoreVertical, Eye, Edit, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockLeads = [];

const getStatusColor = (status) => {
    switch (status) {
        case 'Price Updated': return { bg: '#e8f5e9', color: '#2e7d32' };
        case 'Highest Bid Received': return { bg: '#e0f2f1', color: '#00897b' };
        case 'In Process': return { bg: '#fff3e0', color: '#fb8c00' };
        case 'New': return { bg: '#e3f2fd', color: '#1e88e5' };
        case 'Inspection Pending': return { bg: '#fffde7', color: '#fbc02d' };
        default: return { bg: '#f5f5f5', color: '#616161' };
    }
};

export default function AdminLeads() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuRowId, setMenuRowId] = useState(null);

    const handleMenuClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setMenuRowId(id);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuRowId(null);
    };

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Card>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
                <Typography variant="h6" fontWeight="bold">Lead Management (Bid N Drive)</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        size="small"
                        placeholder="Search leads..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={18} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button variant="outlined" color="primary" startIcon={<Filter size={18} />}>
                        Filters
                    </Button>
                </Box>
            </Box>

            <TableContainer>
                <Table sx={{ minWidth: 1000 }}>
                    <TableHead sx={{ bgcolor: '#f9fafb' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Lead ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Customer / Franchise</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Vehicle</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Assigned To</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockLeads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const statusColor = getStatusColor(row.status);
                            return (
                                <TableRow key={row.id} hover>
                                    <TableCell fontWeight="600">{row.id}</TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight="bold">{row.customer}</Typography>
                                        <Typography variant="caption" color="text.secondary">{row.franchise}</Typography>
                                    </TableCell>
                                    <TableCell>{row.vehicle}</TableCell>
                                    <TableCell>
                                        {row.assignedTo === 'Unassigned' ? (
                                            <Chip label="Unassigned" size="small" color="error" variant="outlined" />
                                        ) : row.assignedTo}
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
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={(e) => handleMenuClick(e, row.id)}>
                                            <MoreVertical size={18} />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl) && menuRowId === row.id}
                                            onClose={handleMenuClose}
                                            sx={{ '& .MuiPaper-root': { borderRadius: 2, minWidth: 150 } }}
                                        >
                                            <MenuItem onClick={handleMenuClose}><Eye size={16} className="mr-2" /> View Details</MenuItem>
                                            <MenuItem onClick={handleMenuClose}><UserCheck size={16} className="mr-2" /> Assign Lead</MenuItem>
                                            <MenuItem onClick={handleMenuClose}><Edit size={16} className="mr-2" /> Update Status</MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={mockLeads.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    );
}
