import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/prodjegg.png';
import logoC from '../assets/imgcache.png'

const Header = ({ activeSection, scrollToSection, isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'projects', label: 'Projets' },
    { id: 'pricing', label: 'Tarifs' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprime le token
    onLogout(); // Met à jour l'état de connexion
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="logo"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain max-h-14"
            />
          </div>

          {/* Logo du milieu - Connexion/Déconnexion */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="transition-transform hover:scale-105"
                title="Se déconnecter"
              >
                <img
                  src={logoC}
                  alt="Se déconnecter"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain max-h-14"
                />
              </button>
            ) : (
              <Link to="/login" title="Se connecter">
                <img
                  src={logoC}
                  alt="Se déconnecter"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain max-h-14 opacity-0 cursor-pointer"
                />

              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === item.id
                  ? 'text-yellow-600 bg-blue-50'
                  : 'text-gray-700 hover:text-yellow-600 hover:bg-gray-50'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-200">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === item.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;