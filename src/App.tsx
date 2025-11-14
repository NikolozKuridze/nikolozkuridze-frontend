import { ThemeProvider } from './hooks/useTheme';
import { Navigation } from './components/Navigation/Navigation';
import { Hero } from './sections/Hero/Hero';
import { About } from './sections/About/About';
import { Experience } from './sections/Experience/Experience';
import { Projects } from './sections/Projects/Projects';
import { Contact } from './sections/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
