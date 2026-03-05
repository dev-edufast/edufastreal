import { CounselorRoute } from '../components/ProtectedRoute';
import { SharedLayout } from '../components/SharedLayout';

// Admin dashboard is accessible to counselors for leads, bookings, registrations
// Super admins and admins have full access
export default [CounselorRoute, SharedLayout];