import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { Navigation } from './components/Navigation/Navigation';
import { Hero } from './sections/Hero/Hero';
import { About } from './sections/About/About';
import { Experience } from './sections/Experience/Experience';
import { Projects } from './sections/Projects/Projects';
import { Contact } from './sections/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminBlogs from './pages/admin/Blogs';
import BlogEditor from './pages/admin/BlogEditor';
import AdminProjects from './pages/admin/Projects';
import ProjectEditor from './pages/admin/ProjectEditor';
import ProtectedRoute from './components/admin/ProtectedRoute';
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

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <ProtectedRoute>
                <AdminBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs/new"
            element={
              <ProtectedRoute>
                <BlogEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs/edit/:id"
            element={
              <ProtectedRoute>
                <BlogEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <AdminProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects/new"
            element={
              <ProtectedRoute>
                <ProjectEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects/edit/:id"
            element={
              <ProtectedRoute>
                <ProjectEditor />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
