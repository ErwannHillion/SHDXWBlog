const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments.controller");
const validateWithJoi = require("../middlewares/validation.middleware");
const { createCommentSchema, updateCommentSchema } = require("../dtos/comments.dtos");
const authenticate = require("../middlewares/authenticate.middleware");

// Créer un commentaire sur un post
router.post('/posts/:postId/comments', authenticate, validateWithJoi(createCommentSchema), commentsController.createComment);

// Obtenir tous les commentaires d'un post
router.get('/posts/:postId/comments', commentsController.getCommentsByPost);

// Modifier un commentaire
router.patch('/comments/:id', authenticate, validateWithJoi(updateCommentSchema), commentsController.updateComment);

// Supprimer un commentaire
router.delete('/comments/:id', authenticate, commentsController.deleteComment);

module.exports = router;
