import Joi from 'joi';

export const codigo = Joi.string().trim().min(2).max(20)
  .messages({
    'string.base': 'codigo must be a string',
    'string.min': 'codigo must be at least 2 characters long',
    'string.max': 'codigo must be less than or equal to 20 characters long',
    'any.required': 'codigo field is required'
  });

export const nombre = Joi.string()
  .regex(new RegExp('^[a-zA-ZÀ-ÿ\\u00f1\\u00d1][a-zA-ZÀ-ÿ0-9 \\u00f1\\u00d1]*[a-zA-ZÀ-ÿ0-9\\u00f1\\u00d1]$'))
  .min(3)
  .max(100)
  .messages({
    'string.base': 'nombre must be a string',
    'string.pattern.base': 'Error in nombre field',
    'string.max': 'nombre length must be less than or equal to 100 characters long',
    'string.min': 'nombre length must be at least 3 characters long',
    'any.required': 'nombre field is required'
  });

export const descripcion = Joi.string().trim().min(3).max(500)
  .messages({
    'string.base': 'descripcion must be a string',
    'string.min': 'descripcion must be at least 3 characters long',
    'string.max': 'descripcion must be less than or equal to 500 characters long',
    'any.required': 'descripcion field is required'
  });

export const categoriaId = Joi.string().regex(/^[0-9a-fA-F]{24}$/)
  .messages({
    'string.base': 'categoriaId must be a string',
    'string.pattern.base': 'categoriaId must be a valid MongoDB ObjectId',
    'any.required': 'categoriaId field is required'
  });

export const precio = Joi.number().min(0)
  .messages({
    'number.base': 'precio must be a number',
    'number.min': 'precio must be greater than or equal to 0',
    'any.required': 'precio field is required'
  });

export const impuestosItem = Joi.object({
  iva: Joi.number().min(0).max(100).default(0).messages({
    'number.base': 'iva must be a number',
    'number.min': 'iva must be greater than or equal to 0',
    'number.max': 'iva must be less than or equal to 100'
  }),
  impuestoConsumo: Joi.number().min(0).max(100).default(0).messages({
    'number.base': 'impuestoConsumo must be a number',
    'number.min': 'impuestoConsumo must be greater than or equal to 0',
    'number.max': 'impuestoConsumo must be less than or equal to 100'
  }),
  retencionFuente: Joi.number().min(0).max(100).default(0).messages({
    'number.base': 'retencionFuente must be a number',
    'number.min': 'retencionFuente must be greater than or equal to 0',
    'number.max': 'retencionFuente must be less than or equal to 100'
  })
});

export const impuestos = Joi.array().items(impuestosItem)
  .messages({
    'array.base': 'impuestos must be an array',
    'any.required': 'impuestos field is required'
  });

export const activo = Joi.boolean().strict()
  .messages({
    'boolean.base': 'activo must be a boolean',
    'any.required': 'activo field is required'
  });

export const createProductoDto = Joi.object({
  codigo: codigo.required(),
  nombre: nombre.required(),
  descripcion: descripcion.required(),
  categoriaId: categoriaId.required(),
  precio: precio.required(),
  impuestos: impuestos.required()
});

export const updateProductoDto = Joi.object({
  codigo: codigo,
  nombre: nombre,
  descripcion: descripcion,
  categoriaId: categoriaId,
  precio: precio,
  impuestos: impuestos,
  activo: activo
});