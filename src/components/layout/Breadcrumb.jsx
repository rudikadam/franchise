import { useLocation, Link } from 'react-router-dom';
import { Breadcrumbs, Typography, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function Breadcrumb() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Box sx={{ mb: 3 }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" to="/" className="text-gray-500 hover:text-primary-600 no-underline">
                    Home
                </Link>
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return last ? (
                        <Typography color="text.primary" key={to} className="capitalize">
                            {value}
                        </Typography>
                    ) : (
                        <Link color="inherit" to={to} key={to} className="text-gray-500 hover:text-primary-600 no-underline capitalize">
                            {value}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </Box>
    );
}
