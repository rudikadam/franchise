import { useState } from 'react';
import {
    Box, Card, Typography, TextField, InputAdornment, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
    IconButton, Chip
} from '@mui/material';
import { Search, Filter, Eye } from 'lucide-react';

const mockLeads = [];

export default function CloseLeads() {
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
                <Typography variant="h6" fontWeight="bold">Closed Leads</Typography>
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
                            <TableCell sx={{ fontWeight: 600 }}>Deal ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Buyer</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Car</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Closed On</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Days</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockLeads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id} hover sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' } }}>
                                <TableCell sx={{ fontWeight: 600 }}>{row.id}</TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight="bold">{row.buyer}</Typography>
                                </TableCell>
                                <TableCell>{row.car}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{row.price}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.closedOn}</TableCell>
                                <TableCell>{row.days}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={row.status}
                                        size="small"
                                        sx={{
                                            bgcolor: '#e8f5e9',
                                            color: '#2e7d32',
                                            fontWeight: 600
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton size="small">
                                        <Eye size={18} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
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
