const Joi = require("joi");

const createCommentSchema = Joi.object({
    content: Joi.string().required().messages({
        'string.empty': 'Le contenu du commentaire est requis',
        'any.required': 'Le contenu du commentaire est requis'
    })
});

const updateCommentSchema = Joi.object({
    content: Joi.string().required().messages({
        'string.empty': 'Le contenu du commentaire est requis',
        'any.required': 'Le contenu du commentaire est requis'
    })
});

module.exports = {
    createCommentSchema,
    updateCommentSchema
};
