const Joi = require("joi");

const createPostSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Le titre est requis',
        'any.required': 'Le titre est requis'
    }),
    content: Joi.string().required().messages({
        'string.empty': 'Le contenu est requis',
        'any.required': 'Le contenu est requis'
    })
});

const updatePostSchema = Joi.object({
    title: Joi.string(),
    content: Joi.string()
}).min(1);

module.exports = {
    createPostSchema,
    updatePostSchema
};
