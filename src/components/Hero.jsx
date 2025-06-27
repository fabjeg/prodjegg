import { useState, useEffect } from "react";

const Hero = ({ scrollToSection }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/hero')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setTitle(data.title || '');
          setSubtitle(data.subtitle || '');
        }
      })
      .catch(err => console.error('Erreur chargement Hero:', err));
  }, []);
  const saveHero = () => {
    fetch('http://localhost:3000/hero', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      },
      body: JSON.stringify({ title, subtitle })
    })
      .then(res => res.json())
      .then(data => console.log('Hero mis à jour', data))
      .catch(err => console.error('Erreur enregistrement:', err));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-600 via-zinc-800 to-zinc-900 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPgo8L3N2Zz4=')`
        }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">

          {/* Main Heading */}
          {/* Titre principal */}
          {isAuthenticated ? (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={saveHero}
              className="text-5xl md:text-7xl font-bold text-white mb-6 text-center bg-transparent outline-none border-b border-yellow-300 focus:border-yellow-500"
            />
          ) : (
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {title.split('Vidéos Drone')[0]}
              <span className="bg-gradient-to-r from-yellow-100 to-yellow-400 bg-clip-text text-transparent">
              </span>
            </h1>
          )}

          {/* Sous-titre */}
          {isAuthenticated ? (
            <textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              onBlur={saveHero}
              className="text-xl md:text-2xl text-blue-100 mb-8 w-full text-center bg-transparent outline-none resize-none border-b border-blue-200 focus:border-yellow-400"
            />
          ) : (
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-2 text-blue-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Vidéos 4K Ultra HD</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Équipement Professionnel</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Post-production Incluse</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Voir Mes Projets
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-transparent border-2 border-blue-300 text-blue-100 hover:bg-yellow-600 hover:text-white font-semibold rounded-lg transition-all transform hover:scale-105"
            >
              Demander un Devis
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}

      </div>
    </section>
  );
};

export default Hero;