const Post = require("../models/post.model");

exports.createPost = async (data, userId) => {
    try {
        const { title, content } = data;

        const newPost = new Post({
            title,
            content,
            author: userId
        });

        await newPost.save();

        return {
            error: false,
            message: "Post créé avec succès",
            data: newPost,
            statusCode: 201
        };
    } catch (error) {
        return {
            error: true,
            message: error.message,
            statusCode: 500
        };
    }
};

exports.getAllPosts = async () => {
    try {
        const posts = await Post.find().populate('author', 'username email').sort({ createdAt: -1 });

        return {
            error: false,
            data: posts,
            statusCode: 200
        };
    } catch (error) {
        return {
            error: true,
            message: error.message,
            statusCode: 500
        };
    }
};

exports.getPostsByUserId = async (userId) => {
    try {
        const posts = await Post.find({ author: userId }).populate('author', 'username email').sort({ createdAt: -1 });

        return {
            error: false,
            data: posts,
            statusCode: 200
        };
    } catch (error) {
        return {
            error: true,
            message: error.message,
            statusCode: 500
        };
    }
};

exports.getPostById = async (postId) => {
    try {
        const post = await Post.findById(postId).populate('author', 'username email');

        if (!post) {
            return {
                error: true,
                message: "Post non trouvé",
                statusCode: 404
            };
        }

        return {
            error: false,
            data: post,
            statusCode: 200
        };
    } catch (error) {
        return {
            error: true,
            message: error.message,
            statusCode: 500
        };
    }
};

exports.updatePost = async (postId, data, userId) => {
    try {
        const post = await Post.findById(postId);

        if (!post) {
            return {
                error: true,
                message: "Post non trouvé",
                statusCode: 404
            };
        }

        if (post.author.toString() !== userId) {
            return {
                error: true,
                message: "Non autorisé",
                statusCode: 403
            };
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $set: data },
            { new: true }
        ).populate('author', 'username email');

        return {
            error: false,
            message: "Post mis à jour",
            data: updatedPost,
            statusCode: 200
        };
    } catch (error) {
        return {
            error: true,
            message: error.message,
            statusCode: 500
        };
    }
};

exports.deletePost = async (postId, userId) => {
    try {
        const post = await Post.findById(postId);

        if (!post) {
            return {
                error: true,
                message: "Post non trouvé",
                statusCode: 404
            };
        }

        if (post.author.toString() !== userId) {
            return {
                error: true,
                message: "Non autorisé",
                statusCode: 403
            };
        }

        await Post.findByIdAndDelete(postId);

        return {
            error: false,
            message: "Post supprimé",
            statusCode: 200
        };
    } catch (error) {
        return {
            error: true,
            message: error.message,
            statusCode: 500
        };
    }
};
