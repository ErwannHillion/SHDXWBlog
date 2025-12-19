import { useState, useEffect, useContext } from 'react';
import { apiService } from '../services/apiService';
import { AuthContext } from '../context/AuthContext';

function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user, token } = useContext(AuthContext);

    useEffect(() => {
        loadComments();
    }, [postId]);

    const loadComments = async () => {
        try {
            setLoading(true);
            const data = await apiService.getCommentsByPost(postId);
            setComments(data.data || []);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        if (!token) {
            setError('Vous devez être connecté pour commenter');
            return;
        }

        if (!newComment.trim()) {
            setError('Le commentaire ne peut pas être vide');
            return;
        }

        try {
            setLoading(true);
            await apiService.createComment(postId, newComment, token);
            setNewComment('');
            await loadComments();
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
            return;
        }

        try {
            setLoading(true);
            await apiService.deleteComment(commentId, token);
            await loadComments();
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginTop: '1.5rem', borderTop: '1px solid #444', paddingTop: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#8b5cf6' }}>
                Commentaires ({comments.length})
            </h3>

            {error && (
                <div style={{
                    padding: '0.75rem',
                    backgroundColor: '#ff000020',
                    border: '1px solid #ff0000',
                    borderRadius: '4px',
                    marginBottom: '1rem',
                    color: '#ff6b6b'
                }}>
                    {error}
                </div>
            )}

            {/* Formulaire d'ajout de commentaire */}
            {token ? (
                <form onSubmit={handleSubmitComment} style={{ marginBottom: '1.5rem' }}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Ajouter un commentaire..."
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#2a2a2a',
                            color: 'white',
                            border: '1px solid #444',
                            borderRadius: '4px',
                            minHeight: '80px',
                            resize: 'vertical',
                            fontFamily: 'inherit'
                        }}
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading || !newComment.trim()}
                        style={{
                            marginTop: '0.5rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#8b5cf6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: loading || !newComment.trim() ? 'not-allowed' : 'pointer',
                            opacity: loading || !newComment.trim() ? 0.5 : 1
                        }}
                    >
                        {loading ? 'Envoi...' : 'Publier'}
                    </button>
                </form>
            ) : (
                <p style={{
                    padding: '1rem',
                    backgroundColor: '#2a2a2a',
                    borderRadius: '4px',
                    marginBottom: '1.5rem',
                    color: '#aaa',
                    fontStyle: 'italic'
                }}>
                    Connectez-vous pour ajouter un commentaire
                </p>
            )}

            {/* Liste des commentaires */}
            {loading && comments.length === 0 ? (
                <p style={{ color: '#888' }}>Chargement des commentaires...</p>
            ) : comments.length === 0 ? (
                <p style={{ color: '#888' }}>Aucun commentaire pour le moment</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {comments.map((comment) => (
                        <div
                            key={comment._id}
                            style={{
                                padding: '1rem',
                                backgroundColor: '#2a2a2a',
                                borderRadius: '4px',
                                border: '1px solid #444'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '0.5rem'
                            }}>
                                <div>
                                    <p style={{
                                        fontWeight: 'bold',
                                        color: '#8b5cf6',
                                        fontSize: '0.9rem'
                                    }}>
                                        {comment.author?.username || 'Anonyme'}
                                    </p>
                                    <p style={{
                                        fontSize: '0.8rem',
                                        color: '#888'
                                    }}>
                                        {new Date(comment.createdAt).toLocaleString('fr-FR')}
                                    </p>
                                </div>

                                {user && comment.author?._id === user.userId && (
                                    <button
                                        onClick={() => handleDeleteComment(comment._id)}
                                        disabled={loading}
                                        style={{
                                            padding: '0.25rem 0.75rem',
                                            backgroundColor: '#ff4444',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: loading ? 'not-allowed' : 'pointer',
                                            fontSize: '0.85rem',
                                            opacity: loading ? 0.5 : 1
                                        }}
                                    >
                                        Supprimer
                                    </button>
                                )}
                            </div>

                            <p style={{ color: '#ccc', lineHeight: '1.5' }}>
                                {comment.content}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CommentSection;
