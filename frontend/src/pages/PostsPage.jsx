import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import CommentSection from '../components/CommentSection';

function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await apiService.getAllPosts();
                setPosts(data.data || []);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <p>Chargement des posts...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '3rem 2rem', textAlign: 'center', color: 'red' }}>
                <p>Erreur : {error}</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Tous les Posts</h1>

            {posts.length === 0 ? (
                <p>Aucun post disponible.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            style={{
                                border: '1px solid #8b5cf6',
                                borderRadius: '8px',
                                padding: '1.5rem',
                                backgroundColor: '#1a1a1a'
                            }}
                        >
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#8b5cf6' }}>
                                {post.title}
                            </h2>
                            <p style={{ marginBottom: '1rem', color: '#ccc' }}>
                                {post.content}
                            </p>
                            <div style={{ fontSize: '0.9rem', color: '#888' }}>
                                <p>Auteur : {post.author?.username || post.author || 'Anonyme'}</p>
                                <p>Date : {new Date(post.createdAt).toLocaleDateString('fr-FR')}</p>
                            </div>

                            <CommentSection postId={post._id} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PostsPage;
