import Home from '../pages/Home';
import Register from '../pages/Register';
import AdminRegister from '../pages/AdminRegister';
import AdminLogin from '../pages/AdminLogin';
import VerifyEmail from '../pages/VerifyEmail';

export const routes = [
  {
    path: '/',
    element: Home,
    label: 'Home',
    showInNav: true
  },
  {
    path: '/register',
    element: Register,
    label: 'Customer Register',
    showInNav: true
  },
  {
    path: '/admin/register',
    element: AdminRegister,
    label: 'Admin Register',
    showInNav: true
  },
  {
    path: '/admin/login',
    element: AdminLogin,
    label: 'Admin Login',
    showInNav: true
  },
  {
    path: '/verify-email',
    element: VerifyEmail,
    label: 'Verify Email',
    showInNav: false
  }
]; 