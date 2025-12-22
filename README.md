# SHDXWBlog – Projet MERN (React / Node / MongoDB)

Application de blog avec authentification, réalisée en stack MERN.  
Objectif : permettre à des utilisateurs inscrits de publier des articles, les consulter et les commenter.

---

## Fonctionnalités

### Frontend (React)

- Trois pages principales minimum via React Router : accueil, liste des posts, détail d’un posts.
- Pages liées à l’authentification : `/login`, `/signup`.
- Navigation via un header.
- Un formulaire complet avec gestion d’état (`useState`) et validation basique.
- Consommation du backend via un ApiService centralisé (GET, POST, PATCH, DELETE).
- Gestion des états : chargement, succès, erreur.
- Gestion d’un état utilisateur connecté.
- Persistance du token JWT dans `localStorage`.
- Récupération automatique du token au rechargement de la page.

### Backend (Node / Express)

- Trois entités  : `User`, `Post`, `Comment`).
- CRUD complet pour l’entité principale `Post`.
- Seconde entité avec au minimum GET + POST.
- Middleware d’authentification par JWT.
- Middleware de validation des données .
- Gestion centralisée des erreurs (optionnel).

### Base de données (MongoDB / Mongoose)

- Trois schémas (`User`, `Post`, `Comment`).
- Relations via ObjectId (ex : `Post.author` → `User`).
- Champs tableau (ex : `tags`, `roles`, `comments`).
- Index pertinent (ex : `User.email` unique).
- Connexion configurée via variables d’environnement (`MONGODB_URI`, etc.).

### Authentification / Sécurité

- Inscription et connexion via `/signup` et `/login`.
- Token JWT stocké côté frontend.
- Routes protégées côté backend.
- Aucun secret en dur (usage d’un fichier `.env`).

### Expérience utilisateur

- Messages d’erreur clairs.
- Messages de succès après les actions CRUD.
- Interface simple et lisible.

---

## Architecture du projet
