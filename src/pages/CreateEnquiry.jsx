import { Box, Card, Typography, TextField, Button, Grid, Divider } from '@mui/material';
import { Upload } from 'lucide-react';

export default function CreateEnquiry() {
    return (
        <Box>
            <Typography variant="h5" fontWeight="bold" mb={3}>Create New Enquiry</Typography>

            <Card sx={{ p: 4, mb: 4 }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>Customer Details</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Customer Name" variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Mobile Number" variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Email" variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="City" variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Location" variant="outlined" size="small" />
                    </Grid>
                </Grid>
            </Card>

            <Card sx={{ p: 4, mb: 4 }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>Vehicle Details</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Registration Number" variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Make" variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Model" variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Variant" variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Manufacturing Year" variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Registration Year" variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Fuel Type" variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Transmission" variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="KM Driven" variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Ownership" variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Insurance Status" variant="outlined" size="small" />
                    </Grid>
                </Grid>
            </Card>

            <Card sx={{ p: 4, mb: 4 }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>Vehicle Images</Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                    Upload Required Images (Front, Rear, Left Side, Right Side, Interior, Dashboard, Tyres, Engine, RC/Document Images).
                </Typography>
                <Box
                    sx={{
                        border: '2px dashed #ccc',
                        borderRadius: 2,
                        p: 6,
                        textAlign: 'center',
                        bgcolor: '#fafafa',
                        cursor: 'pointer'
                    }}
                >
                    <Upload size={32} color="#888" style={{ margin: '0 auto', marginBottom: 8 }} />
                    <Typography variant="subtitle1" fontWeight="500">Click or drag images here to upload</Typography>
                </Box>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" color="inherit">Cancel</Button>
                <Button variant="contained" color="primary">Submit Enquiry</Button>
            </Box>
        </Box>
    );
}
