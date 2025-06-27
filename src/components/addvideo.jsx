import { useState } from 'react';

const Addvideo = ({ onProjectAdded }) => {
    // Récupération du vrai token depuis localStorage
    const token = localStorage?.getItem?.('token') || null;

    const [form, setForm] = useState({
        title: '',
        description: '',
        videoUrl: '',
        thumbnail: '',
        duration: '',
        category: 'immobilier',
    });

    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [imageError, setImageError] = useState(false);

    if (!token) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        // Prévisualisation de l'image quand on saisit l'URL
        if (name === 'thumbnail') {
            if (value && validateImageUrl(value)) {
                setPreviewImage(value);
                setImageError(false);
            } else if (value) {
                setPreviewImage(value); // On essaie quand même
                setError(value ? "L'URL ne semble pas être une image valide" : null);
            } else {
                setPreviewImage('');
                setImageError(false);
                setError(null);
            }
        }
    };

    // Fonction pour valider une URL d'image
    const validateImageUrl = (url) => {
        if (!url) return false;

        // Vérification du format de l'URL
        try {
            new URL(url);
        } catch {
            return false;
        }

        // Vérification des extensions d'image communes
        const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?.*)?$/i;
        const isDirectImage = imageExtensions.test(url);

        // Vérification des domaines d'images connus
        const knownImageHosts = [
            'imgur.com',
            'i.imgur.com',
            'images.unsplash.com',
            'img.youtube.com',
            'i.ytimg.com',
            'cdn.pixabay.com',
            'images.pexels.com',
            'picsum.photos'
        ];

        const isKnownHost = knownImageHosts.some(host => url.includes(host));

        return isDirectImage || isKnownHost;
    };

    const handleImageError = () => {
        setImageError(true);
        console.log('Erreur de chargement image:', previewImage);
    };

    const handleImageLoad = () => {
        setImageError(false);
        console.log('Image chargée avec succès:', previewImage);
    };

    // Fonction pour extraire automatiquement la miniature YouTube
    const extractYouTubeThumbnail = (url) => {
        const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(youtubeRegex);
        if (match) {
            return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
        }
        return '';
    };

    const handleVideoUrlChange = (e) => {
        const videoUrl = e.target.value;
        setForm(prev => ({ ...prev, videoUrl }));

        // Auto-remplir la miniature si c'est une vidéo YouTube
        if (videoUrl && !form.thumbnail) {
            const thumbnail = extractYouTubeThumbnail(videoUrl);
            if (thumbnail) {
                setForm(prev => ({ ...prev, thumbnail }));
                setPreviewImage(thumbnail);
            }
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setError(null);

        // Validation de l'URL de l'image
        if (imageError) {
            setError("L'URL de la miniature ne semble pas valide");
            return;
        }

        try {
            // VRAIE logique d'appel API vers MongoDB
            const token = localStorage.getItem('token'); // Récupération du vrai token

            const res = await fetch('http://localhost:3000/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error('Erreur lors de l\'ajout du projet');

            const newProject = await res.json();
            onProjectAdded(newProject);

            // Reset du formulaire
            setForm({
                title: '',
                description: '',
                videoUrl: '',
                thumbnail: '',
                duration: '',
                category: 'immobilier',
            });
            setPreviewImage('');
            setImageError(false);

        } catch (err) {
            console.error(err);
            setError("Impossible d'ajouter la vidéo.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mb-12 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl text-yellow-400 font-bold mb-4">Ajouter une vidéo</h3>

            {error && (
                <div className="bg-red-900 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Titre"
                    value={form.title}
                    onChange={handleChange}
                    className="p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-yellow-400 focus:outline-none transition"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    rows="3"
                    className="p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-yellow-400 focus:outline-none transition resize-vertical"
                    required
                />

                <div>
                    <input
                        type="url"
                        name="videoUrl"
                        placeholder="Lien de la vidéo (YouTube ou autre)"
                        value={form.videoUrl}
                        onChange={handleVideoUrlChange}
                        className="p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-yellow-400 focus:outline-none transition w-full"
                        required
                    />
                    <small className="text-gray-400 text-sm mt-1 block">
                        💡 Pour YouTube, la miniature sera automatiquement détectée
                    </small>
                </div>

                <div>
                    <input
                        type="url"
                        name="thumbnail"
                        placeholder="URL de la miniature (https://...)"
                        value={form.thumbnail}
                        onChange={handleChange}
                        className="p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-yellow-400 focus:outline-none transition w-full"
                        required
                    />

                    {/* Prévisualisation de l'image */}
                    {previewImage && (
                        <div className="mt-3">
                            <p className="text-gray-300 text-sm mb-2">Aperçu de la miniature :</p>
                            <div className="relative w-48 h-32 bg-gray-700 rounded overflow-hidden">
                                {!imageError ? (
                                    <img
                                        src={previewImage}
                                        alt="Aperçu miniature"
                                        className="w-full h-full object-cover"
                                        onError={handleImageError}
                                        onLoad={handleImageLoad}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-red-400 bg-gray-600">
                                        <div className="text-center">
                                            <div className="text-3xl mb-2">🖼️</div>
                                            <div className="text-xs text-gray-300">Image non accessible</div>
                                            <div className="text-xs text-gray-400 mt-1">Vérifiez l'URL</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <input
                    type="text"
                    name="duration"
                    placeholder="Durée (ex: 2 min, 1h30, 45s)"
                    value={form.duration}
                    onChange={handleChange}
                    className="p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-yellow-400 focus:outline-none transition"
                    required
                />

                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-yellow-400 focus:outline-none transition"
                    required
                >
                    <option value="immobilier">🏠 Immobilier</option>
                    <option value="evenements">🎉 Événements</option>
                    <option value="paysages">🌄 Paysages</option>
                    <option value="commercial">💼 Commercial</option>
                </select>

                <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-6 rounded transition-colors duration-200 flex items-center justify-center gap-2"
                    disabled={imageError}
                >
                    <span>➕</span>
                    Ajouter la vidéo
                </button>
            </form>
        </div>
    );
};

export default Addvideo;