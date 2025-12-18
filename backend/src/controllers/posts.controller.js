const postsService = require("../services/posts.service");

exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.userId;

    const result = await postsService.createPost({ title, content }, userId);
    return res.status(result.statusCode).json(result);
};

exports.getAllPosts = async (req, res) => {
    const result = await postsService.getAllPosts();
    return res.status(result.statusCode).json(result);
};

exports.getMyPosts = async (req, res) => {
    const userId = req.user.userId;
    const result = await postsService.getPostsByUserId(userId);
    return res.status(result.statusCode).json(result);
};

exports.getPostById = async (req, res) => {
    const { id } = req.params;

    const result = await postsService.getPostById(id);
    return res.status(result.statusCode).json(result);
};

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.userId;

    const result = await postsService.updatePost(id, { title, content }, userId);
    return res.status(result.statusCode).json(result);
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await postsService.deletePost(id, userId);
    return res.status(result.statusCode).json(result);
};
