const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

exports.createComment = async (postId, content, userId) => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return { statusCode: 404, message: 'Post not found' };
        }

        const comment = await Comment.create({
            content,
            post: postId,
            author: userId
        });

        const commentWithAuthor = await Comment.findById(comment._id).populate('author', 'username email');

        return { statusCode: 201, message: 'Comment created', data: commentWithAuthor };
    } catch (error) {
        return { statusCode: 500, message: 'Error creating comment', error: error.message };
    }
};

exports.getCommentsByPostId = async (postId) => {
    try {
        const comments = await Comment.find({ post: postId })
            .populate('author', 'username email')
            .sort({ createdAt: -1 });

        return { statusCode: 200, data: comments };
    } catch (error) {
        return { statusCode: 500, message: 'Error fetching comments', error: error.message };
    }
};

exports.updateComment = async (commentId, content, userId) => {
    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return { statusCode: 404, message: 'Comment not found' };
        }

        if (comment.author.toString() !== userId) {
            return { statusCode: 403, message: 'Unauthorized to update this comment' };
        }

        comment.content = content;
        await comment.save();

        const updatedComment = await Comment.findById(commentId).populate('author', 'username email');

        return { statusCode: 200, message: 'Comment updated', data: updatedComment };
    } catch (error) {
        return { statusCode: 500, message: 'Error updating comment', error: error.message };
    }
};

exports.deleteComment = async (commentId, userId) => {
    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return { statusCode: 404, message: 'Comment not found' };
        }

        if (comment.author.toString() !== userId) {
            return { statusCode: 403, message: 'Unauthorized to delete this comment' };
        }

        await comment.deleteOne();

        return { statusCode: 200, message: 'Comment deleted' };
    } catch (error) {
        return { statusCode: 500, message: 'Error deleting comment', error: error.message };
    }
};
