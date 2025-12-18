import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';

function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!username || !email || !password) {
            setError('Tous les champs sont requis');
            return;
        }

        setLoading(true);

        try {
            await apiService.signup(username, email, password);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            padding: '2rem',
            maxWidth: '400px',
            margin: '0 auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </div>
                {error && <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
                {success && <p style={{ color: '#22c55e', marginBottom: '1rem', fontSize: '0.9rem' }}>Inscription réussie !</p>}
                <button type="submit" disabled={loading} style={{ width: '100%' }}>
                    {loading ? 'Chargement...' : 'S\'inscrire'}
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#999' }}>
                Déjà un compte ? <a href="/login">Se connecter</a>
            </p>
        </div>
    );
}

export default SignupPage;
