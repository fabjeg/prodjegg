import { useState, useEffect } from 'react';

const Contact = () => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  const [editContactMode, setEditContactMode] = useState(false);
  const [editWhyChooseMode, setEditWhyChooseMode] = useState(false);

  // États pour l'édition des infos contact
  const [editContactData, setEditContactData] = useState({
    email: '',
    phone: '',
    address: ''
  });

  // États pour l'édition des raisons "Pourquoi choisir"
  const [editWhyChooseData, setEditWhyChooseData] = useState([]);
  const [newReason, setNewReason] = useState('');

  // Formulaire de demande devis
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

  // Données dynamiques
  const [contactInfo, setContactInfo] = useState(null);
  const [whyChooseUs, setWhyChooseUs] = useState([]);
  const [loadingContact, setLoadingContact] = useState(true);
  const [loadingWhyChoose, setLoadingWhyChoose] = useState(true);
  const [errorContact, setErrorContact] = useState(null);
  const [errorWhyChoose, setErrorWhyChoose] = useState(null);

  // États de sauvegarde
  const [savingContact, setSavingContact] = useState(false);
  const [savingWhyChoose, setSavingWhyChoose] = useState(false);

  // Chargement initial des données
  useEffect(() => {
    fetch('https://prodjegg-dd3ce5daf8c5.herokuapp.com/contact-details')
      .then(res => {
        if (!res.ok) throw new Error('Erreur récupération infos contact');
        return res.json();
      })
      .then(data => {
        setContactInfo(data);
        setEditContactData({
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || ''
        });
        setLoadingContact(false);
      })
      .catch(err => {
        setErrorContact(err.message);
        setLoadingContact(false);
      });

    fetch('https://prodjegg-dd3ce5daf8c5.herokuapp.com/why-choose-us')
      .then(res => {
        if (!res.ok) throw new Error('Erreur récupération "Pourquoi choisir"');
        return res.json();
      })
      .then(data => {
        const reasons = data.reasons || [];
        setWhyChooseUs(reasons);
        setEditWhyChooseData([...reasons]);
        setLoadingWhyChoose(false);
      })
      .catch(err => {
        setErrorWhyChoose(err.message);
        setLoadingWhyChoose(false);
      });
  }, []);

  // Formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://prodjegg-dd3ce5daf8c5.herokuapp.com/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du formulaire');
      }

      const result = await response.json();
      setSubmitMessage(result.message);
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
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Édition infos contact
  const handleContactEdit = (field, value) => {
    setEditContactData({
      ...editContactData,
      [field]: value
    });
  };

  const saveContactInfo = async () => {
    setSavingContact(true);
    try {
      const response = await fetch('https://prodjegg-dd3ce5daf8c5.herokuapp.com/contact/${contactId}', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editContactData)
      });


      if (!response.ok) throw new Error('Erreur lors de la sauvegarde');

      const updatedData = await response.json();
      setContactInfo(updatedData);
      setEditContactMode(false);
    } catch (error) {
      console.error('Erreur sauvegarde contact:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSavingContact(false);
    }
  };

  const cancelContactEdit = () => {
    setEditContactData({
      email: contactInfo.email || '',
      phone: contactInfo.phone || '',
      address: contactInfo.address || ''
    });
    setEditContactMode(false);
  };

  // Édition "Pourquoi choisir"
  const handleReasonEdit = (index, value) => {
    const newReasons = [...editWhyChooseData];
    newReasons[index] = value;
    setEditWhyChooseData(newReasons);
  };

  const addReason = () => {
    if (newReason.trim()) {
      setEditWhyChooseData([...editWhyChooseData, newReason.trim()]);
      setNewReason('');
    }
  };

  const removeReason = (index) => {
    const newReasons = editWhyChooseData.filter((_, i) => i !== index);
    setEditWhyChooseData(newReasons);
  };

  const saveWhyChooseUs = async () => {
    setSavingWhyChoose(true);
    try {
      const response = await fetch('https://prodjegg-dd3ce5daf8c5.herokuapp.com/why-choose-us', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ reasons: editWhyChooseData })
      });

      if (!response.ok) throw new Error('Erreur lors de la sauvegarde');

      const updatedData = await response.json();
      setWhyChooseUs(updatedData.reasons || []);
      setEditWhyChooseMode(false);
    } catch (error) {
      console.error('Erreur sauvegarde why choose:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSavingWhyChoose(false);
    }
  };

  const cancelWhyChooseEdit = () => {
    setEditWhyChooseData([...whyChooseUs]);
    setNewReason('');
    setEditWhyChooseMode(false);
  };

  // Options pour le formulaire
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
            <h2 className="text-4xl md:text-5xl font-extrabold" style={{ color: '#FFD500' }}>
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
              <h3 className="text-3xl font-semibold" style={{ color: '#FFD500' }}>
                Demande de Devis
              </h3>

              {submitMessage && (
                <div className="mb-8 p-5 bg-yellow-100 border border-yellow-400 rounded-xl text-yellow-800 font-medium">
                  {submitMessage}
                </div>
              )}

              <form className="space-y-8 text-white" onSubmit={handleSubmit}>
                {/* Nom & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block mb-3 text-sm font-semibold">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-white rounded-xl bg-transparent placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-3 text-sm font-semibold">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-white rounded-xl bg-transparent placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                {/* Téléphone & Lieu */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="phone" className="block mb-3 text-sm font-semibold">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border border-white rounded-xl bg-transparent placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block mb-3 text-sm font-semibold">
                      Lieu du tournage
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border border-white rounded-xl bg-transparent placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
                      placeholder="Ville, région"
                    />
                  </div>
                </div>

                {/* Type de projet & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="projectType" className="block mb-3 text-sm font-semibold">
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
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block mb-3 text-sm font-semibold">
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
                      {budgetRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Délai */}
                <div>
                  <label htmlFor="timeline" className="block mb-3 text-sm font-semibold">
                    Délai souhaité
                  </label>
                  <input
                    type="text"
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-white rounded-xl bg-transparent placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
                    placeholder="Ex: Dans 2 semaines, pour le 15 janvier..."
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block mb-3 text-sm font-semibold">
                    Description du projet *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-4 border border-white rounded-xl bg-transparent placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition resize-none"
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
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-3xl font-semibold" style={{ color: '#FFD500' }}>
                    Informations de Contact
                  </h3>
                  {isAuthenticated && (
                    <div className="space-x-2">
                      {editContactMode ? (
                        <>
                          <button
                            onClick={saveContactInfo}
                            disabled={savingContact}
                            className="text-sm bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white disabled:opacity-50"
                          >
                            {savingContact ? 'Sauvegarde...' : 'Sauvegarder'}
                          </button>
                          <button
                            onClick={cancelContactEdit}
                            className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                          >
                            Annuler
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setEditContactMode(true)}
                          className="text-sm text-yellow-400 hover:text-yellow-300"
                        >
                          Modifier
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {loadingContact && <p>Chargement des informations...</p>}
                {errorContact && <p className="text-red-500">{errorContact}</p>}

                {contactInfo && (
                  <div className="space-y-8">
                    {/* Email */}
                    <div className="flex items-start space-x-5">
                      <div className="flex-shrink-0 w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center">
                        <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-1 text-white">Email</h4>
                        {editContactMode ? (
                          <input
                            type="email"
                            value={editContactData.email}
                            onChange={(e) => handleContactEdit('email', e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded text-white"
                          />
                        ) : (
                          <p>{contactInfo.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Téléphone */}
                    <div className="flex items-start space-x-5">
                      <div className="flex-shrink-0 w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center">
                        <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-1 text-white">Téléphone</h4>
                        {editContactMode ? (
                          <input
                            type="tel"
                            value={editContactData.phone}
                            onChange={(e) => handleContactEdit('phone', e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded text-white"
                          />
                        ) : (
                          <p>{contactInfo.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Adresse */}
                    <div className="flex items-start space-x-5">
                      <div className="flex-shrink-0 w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center">
                        <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-1 text-white">Adresse</h4>
                        {editContactMode ? (
                          <textarea
                            value={editContactData.address}
                            onChange={(e) => handleContactEdit('address', e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded text-white resize-none"
                            rows="2"
                          />
                        ) : (
                          <p>{contactInfo.address}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Pourquoi choisir Drones Vision */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-lg p-10 border border-white/20 text-white">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-2xl font-semibold" style={{ color: '#FFD500' }}>
                    Pourquoi choisir Drones Vision ?
                  </h4>
                  {isAuthenticated && (
                    <div className="space-x-2">
                      {editWhyChooseMode ? (
                        <>
                          <button
                            onClick={saveWhyChooseUs}
                            disabled={savingWhyChoose}
                            className="text-sm bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white disabled:opacity-50"
                          >
                            {savingWhyChoose ? 'Sauvegarde...' : 'Sauvegarder'}
                          </button>
                          <button
                            onClick={cancelWhyChooseEdit}
                            className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                          >
                            Annuler
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setEditWhyChooseMode(true)}
                          className="text-sm text-yellow-400 hover:text-yellow-300"
                        >
                          Modifier
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {loadingWhyChoose && <p>Chargement...</p>}
                {errorWhyChoose && <p className="text-red-500">{errorWhyChoose}</p>}

                {!loadingWhyChoose && !errorWhyChoose && (
                  <div>
                    {editWhyChooseMode ? (
                      <div className="space-y-4">
                        {editWhyChooseData.map((reason, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <input
                              type="text"
                              value={reason}
                              onChange={(e) => handleReasonEdit(index, e.target.value)}
                              className="flex-1 px-3 py-2 bg-white/10 border border-white/30 rounded text-white"
                            />
                            <button
                              onClick={() => removeReason(index)}
                              className="text-red-400 hover:text-red-300 p-2"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ))}

                        <div className="flex items-center space-x-3 mt-4">
                          <input
                            type="text"
                            value={newReason}
                            onChange={(e) => setNewReason(e.target.value)}
                            placeholder="Nouvelle raison..."
                            className="flex-1 px-3 py-2 bg-white/10 border border-white/30 rounded text-white placeholder-white/50"
                          />
                          <button
                            onClick={addReason}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-medium"
                          >
                            Ajouter
                          </button>
                        </div>
                      </div>
                    ) : (
                      <ul className="list-disc list-inside space-y-3">
                        {whyChooseUs.map((reason, i) => (
                          <li key={i}>{reason}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
