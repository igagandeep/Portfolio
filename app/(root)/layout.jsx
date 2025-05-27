import '@/app/globals.css';
import Navbar from '../components/Navbar';
import { ProjectProvider } from '../context/ProjectContext';

export default function RootLayout({ children }) {
  return (
    <>
      <ProjectProvider>
        <Navbar />
        {children}
      </ProjectProvider>
    </>
  );
}
