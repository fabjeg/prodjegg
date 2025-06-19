import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    location: '',
    description: '',
    timeline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Merci pour votre message ! Je vous recontacterai dans les plus brefs délais.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        location: '',
        description: '',
        timeline: ''
      });
    }, 1000);
  };

  const projectTypes = [
    'Immobilier',
    'Événement (Mariage, Fête)',
    'Commercial/Publicitaire',
    'Paysage/Nature',
    'Inspection technique',
    'Autre'
  ];

  const budgetRanges = [
    'Moins de 500€',
    '500€ - 1000€',
    '1000€ - 2000€',
    '2000€ - 5000€',
    'Plus de 5000€'
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5" style={{ color: '#FFD500' }}>
              Parlons de Votre Projet
            </h2>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed">
              Décrivez-moi votre vision et je vous proposerai une solution sur mesure
              pour donner vie à votre projet avec des prises de vue aériennes exceptionnelles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-lg p-10 border border-white/20">
              <h3 className="text-3xl font-semibold text-black mb-8" style={{ color: '#FFD500' }}>
                Demande de Devis
              </h3>

              {submitMessage && (
                <div className="mb-8 p-5 bg-yellow-100 border border-yellow-400 rounded-xl text-yellow-800 font-medium">
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block mb-3 text-sm font-semibold text-white">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-white rounded-xl bg-transparent text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-3 text-sm font-semibold text-white">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-white rounded-xl bg-transparent text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="phone" className="block mb-3 text-sm font-semibold text-white">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border border-white rounded-xl bg-transparent text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
                      placeholder="06 12 34 56 78"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block mb-3 text-sm font-semibold text-white">
                      Lieu du tournage
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border border-white rounded-xl bg-transparent text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
                      placeholder="Ville, région"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="projectType" className="block mb-3 text-sm font-semibold text-white">
                      Type de projet *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-white rounded-xl bg-black text-white focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
                    >
                      <option value="">Sélectionnez un type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block mb-3 text-sm font-semibold text-white">
                      Budget estimé
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border border-white rounded-xl bg-black text-white focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
                    >
                      <option value="">Sélectionnez un budget</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="timeline" className="block mb-3 text-sm font-semibold text-white">
                    Délai souhaité
                  </label>
                  <input
                    type="text"
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-white rounded-xl bg-transparent text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
                    placeholder="Ex: Dans 2 semaines, pour le 15 janvier..."
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block mb-3 text-sm font-semibold text-white">
                    Description du projet *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-4 border border-white rounded-xl bg-transparent text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition resize-none"
                    placeholder="Décrivez votre projet en détail : objectifs, style souhaité, durée de la vidéo, utilisation prévue..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-200 text-black font-semibold py-4 rounded-xl transition flex items-center justify-center space-x-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-4 border-black border-t-transparent"></div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Envoyer ma demande</span>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Infos */}
            <div className="space-y-10">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-lg p-10 border border-white/20 text-white">
                <h3 className="text-3xl font-semibold mb-8" style={{ color: '#FFD500' }}>
                  Informations de Contact
                </h3>

                <div className="space-y-8">
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center">
                      <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-white">Email</h4>
                      <p>contact@drones-vision.fr</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center">
                      <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h2l3 9 4-16 3 9h3" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-white">Téléphone</h4>
                      <p>+33 6 12 34 56 78</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center">
                      <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a7 7 0 00-7-7H6a7 7 0 00-7 7v2h5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-white">Adresse</h4>
                      <p>12 rue des Drones, 56000 Vannes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-lg p-10 border border-white/20 text-white">
                <h4 className="text-2xl font-semibold mb-6" style={{ color: '#FFD500' }}>
                  Pourquoi choisir Drones Vision ?
                </h4>
                <ul className="list-disc list-inside space-y-3">
                  <li>Qualité professionnelle garantie</li>
                  <li>Matériel dernière génération</li>
                  <li>Respect des délais et des budgets</li>
                  <li>Conseils personnalisés adaptés à votre projet</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
