import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function AdminPage() {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div style={{
            padding: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
            flex: 1
        }}>
            <h1 style={{ marginBottom: '2rem' }}>Page Admin</h1>
            <div style={{
                padding: '1.5rem',
                border: '1px solid #8b5cf6',
                borderRadius: '4px'
            }}>
                <p style={{ marginBottom: '1.5rem' }}>
                    Bienvenue {user.email}
                </p>
                <div style={{
                    background: '#111',
                    padding: '1rem',
                    borderRadius: '4px',
                    border: '1px solid #333'
                }}>
                    <h2 style={{ marginBottom: '1rem' }}>Informations utilisateur</h2>
                    <pre style={{ fontSize: '0.9rem', color: '#999' }}>{JSON.stringify(user, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
