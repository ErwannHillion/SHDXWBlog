import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { apiService } from '../services/apiService';

function EditPostPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingPost, setLoadingPost] = useState(true);
    const [error, setError] = useState('');
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        loadPost();
    }, [id]);

    const loadPost = async () => {
        setLoadingPost(true);
        setError('');
        try {
            const data = await apiService.getMyPosts(token);
            const post = data.data.find(p => p._id === id);
            if (post) {
                setTitle(post.title);
                setContent(post.content);
            } else {
                setError('Post non trouvé');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingPost(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title || !content) {
            setError('Tous les champs sont requis');
            return;
        }

        setLoading(true);

        try {
            await apiService.updatePost(id, title, content, token);
            navigate('/my-posts');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loadingPost) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>Chargement...</p>
            </div>
        );
    }

    return (
        <div style={{
            padding: '2rem',
            maxWidth: '800px',
            margin: '0 auto',
            flex: 1
        }}>
            <h1 style={{ marginBottom: '2rem' }}>Modifier le post</h1>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Titre</label>
                    <input
                        type="text"
                        placeholder="Titre du post"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Contenu</label>
                    <textarea
                        placeholder="Contenu du post"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="10"
                        style={{
                            width: '100%',
                            borderRadius: '4px',
                            border: '1px solid #333',
                            padding: '0.75rem',
                            fontSize: '1rem',
                            fontFamily: 'inherit',
                            background: '#111',
                            color: 'white',
                            resize: 'vertical'
                        }}
                    />
                </div>

                {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Modification...' : 'Modifier'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/my-posts')}
                        style={{
                            background: 'transparent',
                            border: '1px solid #8b5cf6'
                        }}
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditPostPage;
