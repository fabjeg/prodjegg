import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // 👈 Hook pour la navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch('https://prodjegg-dd3ce5daf8c5.herokuapp.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),

        })
            .then(async (res) => {
                setLoading(false);
                if (!res.ok) throw new Error(await res.text());
                return res.json();
            })
            .then(data => {
                localStorage.setItem('token', data.token);
                onLoginSuccess(); // 👈 Met à jour l'état de connexion
                navigate('/'); // 👈 Redirige vers la page principale
            })
            .catch(err => {
                alert(err.message || 'Erreur de connexion');
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl text-yellow-400 mb-6 text-center font-bold">Connexion</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Adresse e-mail"
                        value={credentials.email}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        value={credentials.password}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
                        disabled={loading}
                    >
                        {loading ? "Connexion..." : "Se connecter"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;