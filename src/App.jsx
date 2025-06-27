import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Login from './login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'pricing', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-50">
              <Header
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
              />
              <main>
                <section id="home">
                  <Hero scrollToSection={scrollToSection} />
                </section>
                <section id="projects">
                  <Projects isLoggedIn={isLoggedIn} />
                </section>
                <section id="pricing">
                  <Pricing />
                </section>
                <section id="contact">
                  <Contact />
                </section>
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <Login onLoginSuccess={() => setIsLoggedIn(true)} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;