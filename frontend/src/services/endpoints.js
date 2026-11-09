/**
 * Proposed API paths, relative to VITE_API_BASE_URL.
 * The backend developer must confirm names and payload shapes before these
 * are treated as final. Paths marked pending were not in the agreed list.
 */
export const endpoints = {
  register: '/auth/register',
  login: '/auth/login',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password', // pending confirmation
  changePassword: '/auth/change-password', // pending confirmation
  lawyers: '/lawyers',
  lawyer: (id) => `/lawyers/${id}`,
  lawyerProfile: '/lawyers/profile',
  availability: '/lawyers/availability', // pending confirmation
  appointments: '/appointments',
  appointment: (id) => `/appointments/${id}`,
  chat: '/chat',
  chatHistory: '/chat/history', // pending confirmation
  adminDashboard: '/admin/dashboard',
  adminUsers: '/admin/users',
  adminUserStatus: (id) => `/admin/users/${id}/status`, // pending confirmation
  adminLawyers: '/admin/lawyers',
  adminPendingLawyers: '/admin/lawyers/pending',
  approveLawyer: (id) => `/admin/lawyers/${id}/approve`,
  rejectLawyer: (id) => `/admin/lawyers/${id}/reject`,
  adminAppointments: '/admin/appointments',
  adminDocuments: '/admin/documents', // pending confirmation
  documents: '/documents', // pending confirmation
  documentDownload: (id) => `/documents/${id}/download`, // pending confirmation
  enquiries: '/enquiries', // pending confirmation
  enquiryRespond: (id) => `/enquiries/${id}/respond`, // pending confirmation
  profile: '/users/profile', // pending confirmation
  contact: '/contact', // pending confirmation
  testimonials: '/testimonials', // pending confirmation
}
