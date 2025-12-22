const API_URL = 'http://localhost:3000';

export const apiService = {
    async login(email, password) {
        const response = await fetch(`${API_URL}/auth/sign-in`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.message || 'Erreur de connexion');
        }

        return data;
    },

    async signup(username, email, password) {
        const response = await fetch(`${API_URL}/auth/sign-up`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.message || 'Erreur lors de l\'inscription');
        }

        return data;
    },

    async getAllPosts() {
        const response = await fetch(`${API_URL}/posts`);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.message || 'Erreur de récupération des posts');
        }

        return data;
    },

    async getMyPosts(token) {
        const response = await fetch(`${API_URL}/posts/my-posts`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        if (data.error) {
            throw new Error(data.message || 'Erreur de récuperation de vos posts');
        }

        return data;
    },

    async createPost(title, content, token) {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, content })
        });

        if (!response.ok) {
            const text = await response.text();
            try {
                const data = JSON.parse(text);
                throw new Error(data.message || 'Erreur de creation du post');
            } catch {
                throw new Error(`Erreur ${response.status}: ${text || 'Erreur serveur'}`);
            }
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.message || 'Erreur de creation du post');
        }

        return data;
    },

    async deletePost(postId, token) {
        const response = await fetch(`${API_URL}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.message || 'Erreur de suppression');
        }

        return data;
    },

    async updatePost(postId, title, content, token) {
        const response = await fetch(`${API_URL}/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, content })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.message || 'Erreur de modification');
        }

        return data;
    },

    async getCommentsByPost(postId) {
        const response = await fetch(`${API_URL}/post-comments/posts/${postId}/comments`);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.message || 'Erreur de récupération des commentaires');
        }

        return data;
    },

    async createComment(postId, content, token) {
        const response = await fetch(`${API_URL}/post-comments/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ content })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.message || 'Erreur de création du commentaire');
        }

        return data;
    },

    async deleteComment(commentId, token) {
        const response = await fetch(`${API_URL}/post-comments/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.message || 'Erreur de suppression du commentaire');
        }

        return data;
    }
};
