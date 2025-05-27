'use clients';
import AdminNavbar from '@/app/components/AdminNavbar';
import { Toaster } from 'react-hot-toast';
import { ProjectProvider } from '../context/ProjectContext';
import { AuthProvider } from '../context/AuthContext';
import axios from 'axios';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function DashboardLayout({ children }) {
  return (
    <>
      <AuthProvider>
        <ProjectProvider>
          <AdminNavbar />
          <main className='pt-24'>{children}</main>
          <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
        </ProjectProvider>
      </AuthProvider>
    </>
  );
}
