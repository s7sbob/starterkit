// src/routes/Router.tsx
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import  Profile  from 'src/views/profile/Profile';
import Settings from 'src/views/settings/Settings';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Public Pages (Blank Layout)**** */
const Homepage = Loadable(lazy(() => import('../views/homepage/Homepage')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/ForgotPassword')));
const ResetPassword = Loadable(lazy(() => import('../views/authentication/ResetPassword')));
const VerifyEmail = Loadable(lazy(() => import('../views/authentication/VerifyEmail')));
const Error404 = Loadable(lazy(() => import('../views/authentication/Error')));

/* ****Protected Pages (Full Layout)**** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const Analytics = Loadable(lazy(() => import('../views/analytics/Analytics')));

// Cards Management
const MyCards = Loadable(lazy(() => import('../views/cards/MyCards')));
const CreateCard = Loadable(lazy(() => import('../views/cards/CreateCard')));
const EditCard = Loadable(lazy(() => import('../views/cards/EditCard')));
const CardPreview = Loadable(lazy(() => import('../views/cards/CardPreview')));
const Templates = Loadable(lazy(() => import('../views/cards/Templates')));

// QR & Tools
const QRGenerator = Loadable(lazy(() => import('../views/qr/QRGenerator')));

// Placeholder components for future development
const ComingSoon = Loadable(lazy(() => import('../views/common/ComingSoon')));

/* ****Public Card View**** */
const PublicCard = Loadable(lazy(() => import('../views/public/PublicCard')));

const Router = [
  // Public Routes (Blank Layout)
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      // Homepage as default
      { path: '/', element: <Homepage /> },
      
      // Authentication routes
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/reset-password', element: <ResetPassword /> },
      { path: '/auth/verify-email', element: <VerifyEmail /> },
      
      // Public card view
      { path: '/card/:username', element: <PublicCard /> },
      { path: '/c/:cardId', element: <PublicCard /> },
      
      // Error pages
      { path: '/404', element: <Error404 /> },
      { path: '/auth/404', element: <Error404 /> },
    ],
  },
  
  // Protected Routes (Full Layout)
  {
    path: '/dashboard',
    element: <FullLayout />,
    children: [
      // Dashboard as default for protected area
      { path: '/dashboard', element: <Navigate to="/dashboard/home" /> },
      { path: '/dashboard/home', element: <Dashboard /> },
      
      // Analytics
      { path: '/dashboard/analytics', element: <Analytics /> },
      
      // Cards Management
      { path: '/dashboard/cards', element: <MyCards /> },
      { path: '/dashboard/cards/create', element: <CreateCard /> },
      { path: '/dashboard/cards/edit/:id', element: <EditCard /> },
      { path: '/dashboard/cards/preview/:id', element: <CardPreview /> },
      { path: '/dashboard/cards/templates', element: <Templates /> },
      
      // QR Code Management
      { path: '/dashboard/qr', element: <QRGenerator /> },
      
      // Sharing & Public View (placeholder)
      { path: '/dashboard/share', element: <ComingSoon /> },
      { path: '/dashboard/public-view', element: <ComingSoon /> },
      
      // Contacts & Networking (placeholder)
      { path: '/dashboard/contacts', element: <ComingSoon /> },
      { path: '/dashboard/leads', element: <ComingSoon /> },
      
      // Tools & Features (placeholder)
      { path: '/dashboard/nfc', element: <ComingSoon /> },
      { path: '/dashboard/landing-pages', element: <ComingSoon /> },
      { path: '/dashboard/downloads', element: <ComingSoon /> },
      
      // Account & Settings (placeholder)
      { path: '/dashboard/profile', element: <Profile /> },
      { path: '/dashboard/subscription', element: <ComingSoon /> },
      { path: '/dashboard/notifications', element: <ComingSoon /> },
      { path: '/dashboard/settings', element: <Settings /> },
      { path: '/dashboard/privacy', element: <ComingSoon /> },
      
      // Support & Help (placeholder)
      { path: '/dashboard/help', element: <ComingSoon /> },
      { path: '/dashboard/contact', element: <ComingSoon /> },
      { path: '/dashboard/feedback', element: <ComingSoon /> },
      
      // Catch all for protected routes
      { path: '/dashboard/*', element: <Navigate to="/dashboard/home" /> },
    ],
  },
  
  // Catch all unmatched routes
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];

const router = createBrowserRouter(Router);
export default router;
