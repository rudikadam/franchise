import { useState } from 'react';
import {
    Box, Card, Typography, TextField, InputAdornment, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
    IconButton, Chip
} from '@mui/material';
import { Search, Plus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockEnquiries = [];

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

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Card>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
                <Typography variant="h6" fontWeight="bold">My Enquiries</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        size="small"
                        placeholder="Search enquiries..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={18} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button component={Link} to="/enquiries/create" variant="contained" color="primary" startIcon={<Plus size={18} />}>
                        Create Enquiry
                    </Button>
                </Box>
            </Box>

            <TableContainer>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead sx={{ bgcolor: '#f9fafb' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Enquiry ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Vehicle</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Highest Bid</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Last Updated</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockEnquiries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const statusColor = getStatusColor(row.status);
                            return (
                                <TableRow key={row.id} hover>
                                    <TableCell fontWeight="600">{row.id}</TableCell>
                                    <TableCell>{row.customer}</TableCell>
                                    <TableCell>{row.vehicle}</TableCell>
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
                                    <TableCell sx={{ fontWeight: row.highestBid !== 'N/A' ? 'bold' : 'normal' }}>
                                        {row.highestBid}
                                    </TableCell>
                                    <TableCell>{row.lastUpdated}</TableCell>
                                    <TableCell align="right">
                                        <IconButton component={Link} to={`/enquiries/${row.id}`} size="small">
                                            <Eye size={18} />
                                        </IconButton>
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
                count={mockEnquiries.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    );
}
