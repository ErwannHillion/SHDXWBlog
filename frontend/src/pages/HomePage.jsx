import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function HomePage() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div style={{
            padding: '3rem 2rem',
            maxWidth: '1200px',
            margin: '0 auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Accueil</h1>
            {user ? (
                <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    border: '1px solid #8b5cf6',
                    borderRadius: '4px'
                }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                        Bienvenue {user.email}
                    </p>
                    <button onClick={logout}>
                        Se déconnecter
                    </button>
                </div>
            ) : (
                <p style={{ fontSize: '1.1rem', color: '#999' }}>
                    Veuillez vous connecter
                </p>
            )}
        </div>
    );
}

export default HomePage;
