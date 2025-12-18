const commentsService = require("../services/comments.service");

exports.createComment = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    const result = await commentsService.createComment(postId, content, userId);
    return res.status(result.statusCode).json(result);
};

exports.getCommentsByPost = async (req, res) => {
    const { postId } = req.params;

    const result = await commentsService.getCommentsByPostId(postId);
    return res.status(result.statusCode).json(result);
};

exports.updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    const result = await commentsService.updateComment(id, content, userId);
    return res.status(result.statusCode).json(result);
};

exports.deleteComment = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await commentsService.deleteComment(id, userId);
    return res.status(result.statusCode).json(result);
};
