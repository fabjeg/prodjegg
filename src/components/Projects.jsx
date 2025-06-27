import { useState, useEffect } from 'react';
import Addvideo from './addvideo';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  const categories = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'immobilier', label: 'Immobilier' },
    { id: 'evenements', label: 'Événements' },
    { id: 'paysages', label: 'Paysages' },
    { id: 'commercial', label: 'Commercial' }
  ];

  useEffect(() => {
    fetch('https://prodjegg-dd3ce5daf8c5.herokuapp.com/projects')

      .then(res => res.json())
      .then(setProjects)
      .catch(console.error);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Supprimer ce projet ?')) return;

    fetch(`https://prodjegg-dd3ce5daf8c5.herokuapp.com/projects/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors de la suppression');
        setProjects(prev => prev.filter(p => p._id !== id));
      })
      .catch(err => {
        console.error(err);
        alert("Échec de la suppression");
      });
  };

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter(project => project.category && project.category.toLowerCase() === selectedCategory);

  return (
    <section className="py-20 bg-black">
      {isAuthenticated && (
        <Addvideo onProjectAdded={(project) => setProjects(prev => [project, ...prev])} />
      )}

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6">
            Mes Projets
          </h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Découvrez une sélection de mes créations vidéo réalisées avec des drones professionnels.
            Chaque projet raconte une histoire unique vue du ciel.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all
                ${selectedCategory === category.id
                  ? 'bg-yellow-400 text-black shadow-lg'
                  : 'bg-white text-black hover:bg-yellow-300'
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const categoryId = project.category ? project.category.toLowerCase() : '';
            const categoryLabel = categories.find(cat => cat.id === categoryId)?.label || 'Catégorie inconnue';

            return (
              <div
                key={project._id}
                className="group bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.thumbnail || 'https://via.placeholder.com/400x200?text=No+Image'}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedVideo(project)}
                      className="bg-yellow-400 rounded-full p-4 hover:bg-yellow-300 transition-colors"
                    >
                      <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black text-sm px-2 py-1 rounded">
                    {project.duration || ''}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-yellow-400 font-semibold capitalize">
                      {categoryLabel}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedVideo(project)}
                        className="text-yellow-400 hover:text-yellow-300 font-semibold text-sm"
                      >
                        Regarder
                      </button>
                      {isAuthenticated && (
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="text-red-400 hover:text-red-600 font-semibold text-sm"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="bg-gray-900 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-yellow-400">{selectedVideo.title}</h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-400 hover:text-yellow-400 p-2 transition-colors"
                  aria-label="Fermer la modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="aspect-video bg-black rounded-lg mb-4">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
              <p className="text-gray-300">{selectedVideo.description}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
