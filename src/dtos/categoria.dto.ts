import Joi from 'joi';

export const codigo = Joi.string().trim().min(2).max(20)
  .messages({
    'string.base': 'codigo must be a string',
    'string.min': 'codigo must be at least 2 characters long',
    'string.max': 'codigo must be less than or equal to 20 characters long',
    'any.required': 'codigo field is required'
  });

export const descripcion = Joi.string().trim().min(3).max(200)
  .messages({
    'string.base': 'descripcion must be a string',
    'string.min': 'descripcion must be at least 3 characters long',
    'string.max': 'descripcion must be less than or equal to 200 characters long',
    'any.required': 'descripcion field is required'
  });

export const nombre = Joi.string()
  .regex(new RegExp('^[a-zA-ZÀ-ÿ\\u00f1\\u00d1][a-zA-ZÀ-ÿ \\u00f1\\u00d1]*[a-zA-ZÀ-ÿ\\u00f1\\u00d1]$'))
  .min(3)
  .max(100)
  .messages({
    'string.base': 'nombre must be a string',
    'string.pattern.base': 'Error in nombre field',
    'string.max': 'nombre length must be less than or equal to 100 characters long',
    'string.min': 'nombre length must be at least 3 characters long',
    'any.required': 'nombre field is required'
  });

export const activo = Joi.boolean().strict()
  .messages({
    'boolean.base': 'activo must be a boolean',
    'any.required': 'activo field is required'
  });

export const createCategoriaDto = Joi.object({
  codigo: codigo.required(),
  descripcion: descripcion.required(),
  nombre: nombre.required()
});

export const updateCategoriaDto = Joi.object({
  codigo: codigo,
  descripcion: descripcion,
  nombre: nombre,
  activo: activo
});