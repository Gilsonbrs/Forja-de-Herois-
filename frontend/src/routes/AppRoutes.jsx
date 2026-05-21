import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

function RequireAuth({ children }) {
  const location = useLocation();
  const token = Boolean(localStorage.getItem('token'));

  return token ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
