import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostJobPage from './pages/PostJobPage';
import DashboardPage from './pages/DashboardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'jobs', Component: JobsPage },
      { path: 'jobs/:id', Component: JobDetailPage },
      { path: 'login', Component: LoginPage },
      { path: 'register', Component: RegisterPage },
      { path: 'post-job', Component: PostJobPage },
      { path: 'dashboard', Component: DashboardPage },
    ],
  },
]);
