import Joi from 'joi';

export const clienteId = Joi.string().regex(/^[0-9a-fA-F]{24}$/)
  .messages({
    'string.base': 'clienteId must be a string',
    'string.pattern.base': 'clienteId must be a valid MongoDB ObjectId',
    'any.required': 'clienteId field is required'
  });

export const productoId = Joi.string().regex(/^[0-9a-fA-F]{24}$/)
  .messages({
    'string.base': 'productoId must be a string',
    'string.pattern.base': 'productoId must be a valid MongoDB ObjectId',
    'any.required': 'productoId field is required'
  });

export const cantidad = Joi.number().integer().min(1)
  .messages({
    'number.base': 'cantidad must be a number',
    'number.integer': 'cantidad must be an integer',
    'number.min': 'cantidad must be at least 1',
    'any.required': 'cantidad field is required'
  });

export const itemFactura = Joi.object({
  productoId: productoId.required(),
  cantidad: cantidad.required()
});

export const items = Joi.array().items(itemFactura).min(1)
  .messages({
    'array.base': 'items must be an array',
    'array.min': 'items must contain at least 1 item',
    'any.required': 'items field is required'
  });

export const fecha = Joi.date()
  .messages({
    'date.base': 'fecha must be a valid date',
    'any.required': 'fecha field is required'
  });

export const estado = Joi.string().valid('EMITIDA', 'ANULADA', 'PAGADA')
  .messages({
    'string.base': 'estado must be a string',
    'any.only': 'estado must be one of: EMITIDA, ANULADA, PAGADA',
    'any.required': 'estado field is required'
  });

export const createFacturaDto = Joi.object({
  clienteId: clienteId.required(),
  items: items.required(),
  fecha: fecha.optional()
});

export const updateEstadoFacturaDto = Joi.object({
  estado: estado.required()
});