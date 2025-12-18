const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.controller");
const validateWithJoi = require("../middlewares/validation.middleware");
const { createPostSchema, updatePostSchema } = require("../dtos/posts.dtos");
const authenticate = require("../middlewares/authenticate.middleware");

router.post('/', authenticate, validateWithJoi(createPostSchema), postsController.createPost);
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.patch('/:id', authenticate, validateWithJoi(updatePostSchema), postsController.updatePost);
router.delete('/:id', authenticate, postsController.deletePost);

module.exports = router;
