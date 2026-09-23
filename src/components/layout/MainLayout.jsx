import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Breadcrumb from './Breadcrumb';
import { Box } from '@mui/material';

export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Navbar toggleSidebar={toggleSidebar} />
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        width: { sm: `calc(100% - ${sidebarOpen ? 260 : 80}px)` },
                        transition: 'width 0.2s',
                    }}
                >
                    <Box sx={{ p: 3, flexGrow: 1 }}>
                        <Breadcrumb />
                        <div className="mt-4">
                            <Outlet />
                        </div>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
