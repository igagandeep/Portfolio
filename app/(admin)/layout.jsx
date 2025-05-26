import AdminNavbar from '@/app/components/AdminNavbar';
import { Toaster } from 'react-hot-toast';
import { ProjectProvider } from '../context/ProjectContext';

export default function DashboardLayout({ children }) {
  return (
    <>
      <ProjectProvider>
        <AdminNavbar />
        <main className='pt-20'>{children}</main>

        <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
      </ProjectProvider>
    </>
  );
}
