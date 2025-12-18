import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Header() {
    const { user } = useContext(AuthContext);

    return (
        <header style={{
            padding: '1.5rem 2rem',
            background: '#000',
            borderBottom: '1px solid #8b5cf6',
            color: 'white'
        }}>
            <nav style={{
                display: 'flex',
                gap: '2rem',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <Link to="/" style={{ color: 'white' }}>Accueil</Link>
                <Link to="/posts" style={{ color: 'white' }}>Posts</Link>
                {user ? (
                    <>
                        <Link to="/my-posts" style={{ color: 'white' }}>Mes posts</Link>
                        <Link to="/create-post" style={{ color: 'white' }}>Créer</Link>
                        <span style={{ marginLeft: 'auto', fontSize: '0.9rem', color: '#8b5cf6' }}>
                            {user.email}
                        </span>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'white', marginLeft: 'auto' }}>Connexion</Link>
                        <Link to="/signup" style={{ color: 'white' }}>Inscription</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
