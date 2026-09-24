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

export default function LeadManagment() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Card className="liquid-glass">
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <Typography variant="h6" fontWeight="bold">Lead Management</Typography>
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
                        sx={{ background: 'rgba(255, 255, 255, 0.5)', borderRadius: 1 }}
                    />
                    <Button variant="outlined" color="primary" startIcon={<Filter size={18} />} sx={{ borderColor: 'rgba(25, 118, 210, 0.5)' }}>
                        Filters
                    </Button>
                </Box>
            </Box>

            <TableContainer>
                <Table sx={{ minWidth: 1000 }}>
                    <TableHead sx={{ bgcolor: 'rgba(249, 250, 251, 0.5)' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Enquiry ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Completed At</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Vehicle</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Year</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Top Bid / Bids</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Set Target</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Fuel</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Remaining Time</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockLeads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const statusColor = getStatusColor(row.status);
                            return (
                                <TableRow key={row.id} hover sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' } }}>
                                    <TableCell sx={{ fontWeight: 600 }}>{row.id}</TableCell>
                                    <TableCell>{row.completedAt}</TableCell>
                                    <TableCell>{row.vehicle}</TableCell>
                                    <TableCell>{row.year}</TableCell>
                                    <TableCell>{row.topBid}</TableCell>
                                    <TableCell>{row.setTarget}</TableCell>
                                    <TableCell>{row.fuel}</TableCell>
                                    <TableCell>{row.remainingTime}</TableCell>
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
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                            <IconButton size="small" title="View Details">
                                                <Eye size={18} color="#1976d2" />
                                            </IconButton>
                                            <IconButton size="small" title="Assign Lead">
                                                <UserCheck size={18} color="#2e7d32" />
                                            </IconButton>
                                            <IconButton size="small" title="Update Status">
                                                <Edit size={18} color="#ed6c02" />
                                            </IconButton>
                                        </Box>
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
