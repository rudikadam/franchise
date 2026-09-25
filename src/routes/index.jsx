import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import CreateEnquiry from '../pages/CreateEnquiry';
import MyEnquiries from '../pages/MyEnquiries';
import EnquiryDetails from '../pages/EnquiryDetails';
import Profile from '../pages/Profile';
import AdminLeads from '../pages/AdminLeads';
import Login from '../pages/Login';
import LeadManagment from '../pages/LeadManagment';
import RejectedLeads from '../pages/RejectedLeads';
import CloseLeads from '../pages/CloseLeads';
import FranchiseList from '../pages/Franchise/FranchiseList';
import CreateFranchise from '../pages/Franchise/CreateFranchise';
import Notifications from '../pages/Notifications';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route element={<MainLayout />}>
                {/* Common Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

                {/* Franchise Routes */}
                <Route path="/enquiries/create" element={<ProtectedRoute roles={['franchise', 'admin', 'manager', 'super-admin']}><CreateEnquiry /></ProtectedRoute>} />
                <Route path="/enquiries" element={<ProtectedRoute roles={['franchise']}><MyEnquiries /></ProtectedRoute>} />
                <Route path="/enquiries/:id" element={<ProtectedRoute><EnquiryDetails /></ProtectedRoute>} />
                <Route path="/lead-management" element={<ProtectedRoute roles={['franchise', 'admin', 'manager']}><LeadManagment /></ProtectedRoute>} />
                <Route path="/rejected-leads" element={<ProtectedRoute roles={['franchise', 'admin', 'manager']}><RejectedLeads /></ProtectedRoute>} />
                <Route path="/closed-leads" element={<ProtectedRoute roles={['franchise', 'admin', 'manager']}><CloseLeads /></ProtectedRoute>} />

                {/* Admin/Manager Routes */}
                <Route path="/admin/franchises" element={<ProtectedRoute roles={['admin', 'manager', 'super-admin']}><FranchiseList /></ProtectedRoute>} />
                <Route path="/admin/franchises/create" element={<ProtectedRoute roles={['admin', 'manager', 'super-admin']}><CreateFranchise /></ProtectedRoute>} />
                <Route path="/admin/leads" element={<ProtectedRoute roles={['admin', 'manager', 'super-admin']}><AdminLeads /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute roles={['admin', 'super-admin']}><div className="p-6 h-full text-2xl font-bold flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">Users Management (Admin)</div></ProtectedRoute>} />

                {/* PA/Bidding Routes (Placeholders) */}
                <Route path="/pa/bidding" element={<ProtectedRoute roles={['pa', 'bidding-team', 'super-admin']}><div className="p-6 h-full text-2xl font-bold flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">Bidding Queue (PA Team)</div></ProtectedRoute>} />

            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<div className="p-6 text-2xl">404 Not Found</div>} />
        </Routes>
    );
}
