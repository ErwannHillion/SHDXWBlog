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
    }
};
