import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { apiService } from '../services/apiService';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Tous les champs sont requis');
            return;
        }

        setLoading(true);

        try {
            const data = await apiService.login(email, password);
            login({ email, username: data.data?.username, _id: data.data?.userId }, data.data.token);
            navigate('/');
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
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Connexion</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" disabled={loading} style={{ width: '100%' }}>
                    {loading ? 'Chargement...' : 'Se connecter'}
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#999' }}>
                Pas de compte ? <a href="/signup">S'inscrire</a>
            </p>
        </div>
    );
}

export default LoginPage;
