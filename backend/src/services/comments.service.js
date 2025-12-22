const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

exports.createComment = async (postId, content, userId) => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return { statusCode: 404, message: 'Post non trouvé' };
        }

        const comment = await Comment.create({
            content,
            post: postId,
            author: userId
        });

        const commentWithAuthor = await Comment.findById(comment._id).populate('author', 'username email');

        return { statusCode: 201, message: 'Commentaire créé', data: commentWithAuthor };
    } catch (error) {
        return { statusCode: 500, message: 'Erreur de création', error: error.message };
    }
};

exports.getCommentsByPostId = async (postId) => {
    try {
        const comments = await Comment.find({ post: postId })
            .populate('author', 'username email')
            .sort({ createdAt: -1 });

        return { statusCode: 200, data: comments };
    } catch (error) {
        return { statusCode: 500, message: 'Erreur lors de la récupération des commentaires', error: error.message };
    }
};

exports.updateComment = async (commentId, content, userId) => {
    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return { statusCode: 404, message: 'Commentaire non trouvé' };
        }

        if (comment.author.toString() !== userId) {
            return { statusCode: 403, message: 'Non autorisé à mettre à jour ce commentaire' };
        }

        comment.content = content;
        await comment.save();

        const updatedComment = await Comment.findById(commentId).populate('author', 'username email');

        return { statusCode: 200, message: 'Commentaire mis à jour', data: updatedComment };
    } catch (error) {
        return { statusCode: 500, message: 'Erreur lors de la mise à jour du commentaire', error: error.message };
    }
};

exports.deleteComment = async (commentId, userId) => {
    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return { statusCode: 404, message: 'Commentaire non trouvé' };
        }

        if (comment.author.toString() !== userId) {
            return { statusCode: 403, message: 'Non autorisé' };
        }

        await comment.deleteOne();

        return { statusCode: 200, message: 'Commentaire supprimé' };
    } catch (error) {
        return { statusCode: 500, message: 'Erreur lors de la suppression du commentaire', error: error.message };
    }
};
