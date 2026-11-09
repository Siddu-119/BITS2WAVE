import { Route, Routes } from 'react-router-dom'
import AdminLoginPage from './pages/auth/AdminLoginPage'
import ClientRegisterPage from './pages/auth/ClientRegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import LawyerRegisterPage from './pages/auth/LawyerRegisterPage'
import LoginPage from './pages/auth/LoginPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import RoleSelectPage from './pages/auth/RoleSelectPage'
import AboutPage from './pages/public/AboutPage'
import ContactPage from './pages/public/ContactPage'
import FindLawyersPage from './pages/public/FindLawyersPage'
import HomePage from './pages/public/HomePage'
import LawyerProfilePage from './pages/public/LawyerProfilePage'
import NotFoundPage from './pages/public/NotFoundPage'
import ServicesPage from './pages/public/ServicesPage'
import DashboardPendingPage from './pages/dashboard/DashboardPendingPage'
import PublicLayout from './components/layout/PublicLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'
import RoleBasedRoute from './components/layout/RoleBasedRoute'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="find-lawyers" element={<FindLawyersPage />} />
        <Route path="lawyers/:id" element={<LawyerProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RoleSelectPage />} />
      <Route path="register/client" element={<ClientRegisterPage />} />
      <Route path="register/lawyer" element={<LawyerRegisterPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="admin/login" element={<AdminLoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<RoleBasedRoute allow={['client']} />}>
          <Route path="client/*" element={<DashboardPendingPage role="client" />} />
        </Route>
        <Route element={<RoleBasedRoute allow={['lawyer']} />}>
          <Route path="lawyer/*" element={<DashboardPendingPage role="lawyer" />} />
        </Route>
        <Route element={<RoleBasedRoute allow={['admin']} />}>
          <Route path="admin/*" element={<DashboardPendingPage role="admin" />} />
        </Route>
      </Route>
    </Routes>
  )
}
