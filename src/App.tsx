import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimationProvider } from './context/AnimationContext'
import { ThemeProvider } from './context/ThemeContext'
import MainLayout from './components/layout/MainLayout'
import Loader from './components/ui/Loader'
import './styles/global.scss'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const VideoPortfolioPage = lazy(() => import('./pages/VideoPortfolioPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./components/NotFoundPage'))

function App() {
    return (
        <AnimationProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route path="/" element={<MainLayout />}>
                                <Route index element={<HomePage />} />
                                <Route path="about" element={<AboutPage />} />
                                <Route path="experience" element={<ExperiencePage />} />
                                <Route path="projects" element={<ProjectsPage />} />
                                <Route path="video-portfolio" element={<VideoPortfolioPage />} />
                                <Route path="contact" element={<ContactPage />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </ThemeProvider>
        </AnimationProvider>
    )
}

export default App