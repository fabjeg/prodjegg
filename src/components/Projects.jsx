import { useState } from 'react';


const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');



  const categories = [
    { id: 'all', label: 'Tous les projets' },
    // { id: 'immobilier', label: 'Immobilier' },
    // { id: 'evenement', label: 'Événements' },
    // { id: 'paysage', label: 'Paysages' },
    // { id: 'commercial', label: 'Commercial' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Villa Moderne avec Piscine',
      category: 'immobilier',
      description: 'Présentation immobilière luxueuse avec vues aériennes spectaculaires',
      videoUrl: 'https://www.youtube.com/embed/TkKVY7am_HM',
      thumbnail: 'https://images.unsplash.com/photo-1726591043571-bb92c705dacf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGNoYXRlYXUlMjBkZSUyMHZlcnNhaWxsZXxlbnwwfHwwfHx8MA%3D%3D',


      duration: '2:30'
    },
    {
      id: 2,
      title: 'Mariage au Château',
      category: 'evenement',
      description: 'Captation aérienne d\'un mariage romantique dans un château historique',
      videoUrl: 'https://www.youtube.com/embed/FOPQcTXj5Bo',
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgwIiBoZWlnaHQ9IjI3MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDgwIiBoZWlnaHQ9IjI3MCIgZmlsbD0iI2VjNGE1ZiIvPgogIDx0ZXh0IHg9IjI0MCIgeT0iMTM1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TWFyaWFnZSBDaMOidGVhdTwvdGV4dD4KPC9zdmc+',
      duration: '3:15'
    },
    {
      id: 3,
      title: 'Paysages de Provence',
      category: 'paysage',
      description: 'Survol des lavandes et des villages pittoresques de Provence',
      videoUrl: 'https://www.youtube.com/embed/fT3RJVhjdPI',
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgwIiBoZWlnaHQ9IjI3MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDgwIiBoZWlnaHQ9IjI3MCIgZmlsbD0iIzg1NTNkZiIvPgogIDx0ZXh0IHg9IjI0MCIgeT0iMTM1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJvdmVuY2U8L3RleHQ+Cjwvc3ZnPg==',
      duration: '4:20'
    },
    // {
    //   id: 4,
    //   title: 'Publicité Restaurant',
    //   category: 'commercial',
    //   description: 'Vidéo promotionnelle pour un restaurant gastronomique',
    //   videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    //   thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgwIiBoZWlnaHQ9IjI3MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDgwIiBoZWlnaHQ9IjI3MCIgZmlsbD0iI2Y5NzMxNiIvPgogIDx0ZXh0IHg9IjI0MCIgeT0iMTM1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UmVzdGF1cmFudDwvdGV4dD4KPC9zdmc+',
    //   duration: '1:45'
    // },
    // {
    //   id: 5,
    //   title: 'Complexe Résidentiel',
    //   category: 'immobilier',
    //   description: 'Présentation d\'un nouveau complexe résidentiel avec espaces verts',
    //   videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    //   thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgwIiBoZWlnaHQ9IjI3MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDgwIiBoZWlnaHQ9IjI3MCIgZmlsbD0iIzEwYjk4MSIvPgogIDx0ZXh0IHg9IjI0MCIgeT0iMTM1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q29tcGxleGUgUmVzaWRlbnRpZWw8L3RleHQ+Cjwvc3ZnPg==',
    //   duration: '3:30'
    // },
    // {
    //   id: 6,
    //   title: 'Concert en Plein Air',
    //   category: 'evenement',
    //   description: 'Captation aérienne d\'un festival de musique estival',
    //   videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    //   thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgwIiBoZWlnaHQ9IjI3MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDgwIiBoZWlnaHQ9IjI3MCIgZmlsbD0iI2ZmZWQ0MyIvPgogIDx0ZXh0IHg9IjI0MCIgeT0iMTM1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiMzMzMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Db25jZXJ0PC90ZXh0Pgo8L3N2Zz4=',
    //   duration: '5:00'
    // }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const [selectedVideo, setSelectedVideo] = useState(null);




  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6">
            Mes Projets
          </h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Découvrez une sélection de mes créations vidéo réalisées avec des drones professionnels.
            Chaque projet raconte une histoire unique vue du ciel.
          </p>
        </div>

        {/* Filtres */}
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

        {/* Grille projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-gray-900 rounded-xl shadow-lg overflow-hidden
               transition-shadow duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.thumbnail}
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
                  {project.duration}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-yellow-400 font-semibold capitalize">
                    {categories.find(cat => cat.id === project.category)?.label}
                  </span>
                  <button
                    onClick={() => setSelectedVideo(project)}
                    className="text-yellow-400 hover:text-yellow-300 font-semibold text-sm flex items-center space-x-1"
                  >
                    <span>Regarder</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal vidéo */}
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