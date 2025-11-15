import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './hooks/useTheme';
import { Navigation } from './components/Navigation/Navigation';
import { Hero } from './sections/Hero/Hero';
import { About } from './sections/About/About';
import { Experience } from './sections/Experience/Experience';
import { Projects } from './sections/Projects/Projects';
import { Blogs } from './sections/Blogs/Blogs';
import { Contact } from './sections/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminBlogs from './pages/admin/Blogs';
import BlogEditor from './pages/admin/BlogEditor';
import AdminProjects from './pages/admin/Projects';
import ProjectEditor from './pages/admin/ProjectEditor';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import BlogsPage from './pages/BlogsPage';
import BlogDetailPage from './pages/BlogDetailPage';
import './styles/globals.css';

function HomePage() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Blogs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />

          {/* Admin Login Route - No Layout */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes - Protected with Layout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="blogs/new" element={<BlogEditor />} />
            <Route path="blogs/edit/:id" element={<BlogEditor />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="projects/new" element={<ProjectEditor />} />
            <Route path="projects/edit/:id" element={<ProjectEditor />} />
          </Route>
        </Routes>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e293b',
              color: '#fff',
              border: '1px solid #334155',
              borderRadius: '0.75rem',
              padding: '1rem',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
