import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { apiService } from '../services/apiService';

function MyPostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        loadMyPosts();
    }, []);

    const loadMyPosts = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await apiService.getMyPosts(token);
            setPosts(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (postId) => {
        if (!window.confirm('Supprimer ce post ?')) return;

        try {
            await apiService.deletePost(postId, token);
            loadMyPosts();
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>Chargement...</p>
            </div>
        );
    }

    return (
        <div style={{
            padding: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
            flex: 1
        }}>
            <h1 style={{ marginBottom: '2rem' }}>Mes posts</h1>

            {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}

            {posts.length === 0 ? (
                <p style={{ color: '#999', textAlign: 'center', marginTop: '3rem' }}>
                    Vous n'avez pas encore créé de post
                </p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {posts.map((post) => (
                        <div key={post._id} style={{
                            padding: '1.5rem',
                            border: '1px solid #333',
                            borderRadius: '4px'
                        }}>
                            <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{post.title}</h2>
                            <p style={{ color: '#999', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                Créé le {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                            <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>{post.content}</p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={() => navigate(`/edit-post/${post._id}`)}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid #8b5cf6',
                                        color: '#8b5cf6'
                                    }}
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(post._id)}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid #ef4444',
                                        color: '#ef4444'
                                    }}
                                >
                                    Supprimer
                                </button>
                            </div>
                            <button
                                onClick={() => handleDelete(post._id)}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid #ef4444',
                                    color: '#ef4444'
                                }}
                            >
                                Supprimer
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyPostsPage;
