import Joi from 'joi'

export const nombre = Joi.string().regex(new RegExp('^[a-zA-ZÀ-ÿ\\u00f1\\u00d1][a-zA-ZÀ-ÿ \\u00f1\\u00d1]*[a-zA-ZÀ-ÿ\\u00f1\\u00d1]$')).min(3).max(50)
  .messages({
    'string.base': 'nombre must be a string',
    'string.pattern.base': 'Error in nombre field',
    'string.max': 'nombre length must be less than or equal to 50 characters long',
    'string.min': 'nombre length must be at least 3 characters long',
    'any.required': 'nombre field is required'
  });

export const email = Joi.string().email()
  .messages({
    'string.base': 'email must be a string',
    'string.email': 'email must be a valid email',
    'any.required': 'email field is required'
  });

export const password = Joi.string().min(6).max(100)
  .messages({
    'string.base': 'password must be a string',
    'string.min': 'password must be at least 6 characters long',
    'string.max': 'password must be less than 100 characters long',
    'any.required': 'password field is required'
  });


export const activo = Joi.boolean().strict()
  .messages({
    'boolean.base': 'activo must be a boolean',
    'any.required': 'activo field is required'
  });

  
export const createUserDto = Joi.object({
  email: email.required(),
  password: password.required(),
  nombre: nombre.required()
});

export const updateUserDto = Joi.object({
  email: email,
  nombre: nombre,
  activo: activo
});

export const loginUserDto = Joi.object({
  email: email.required(),
  password: password.required()
});