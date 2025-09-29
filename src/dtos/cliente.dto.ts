import Joi from 'joi';

export const tipoDocumento = Joi.string().valid('CC', 'NIT')
  .messages({
    'any.only': 'Tipo de documento debe ser: CC, NIT',
    'any.required': 'Tipo de documento es requerido'
  });

export const numeroDocumento = Joi.string().min(5).max(15).trim()
  .messages({
    'string.base': 'Número de documento debe ser texto',
    'string.min': 'Número de documento debe tener mínimo 5 caracteres',
    'string.max': 'Número de documento debe tener máximo 15 caracteres',
    'any.required': 'Número de documento es requerido'
  });


export const nombre = Joi.string().min(3).max(100).trim()
  .messages({
    'string.base': 'Nombre debe ser texto',
    'string.min': 'Nombre debe tener mínimo 3 caracteres',
    'string.max': 'Nombre debe tener máximo 100 caracteres',
    'any.required': 'Nombre es requerido'
  });

export const email = Joi.string().email()
  .messages({
    'string.email': 'Email debe ser válido',
    'any.required': 'Email es requerido'
  });

export const telefono = Joi.string().min(7).max(15).trim()
  .messages({
    'string.min': 'Teléfono debe tener mínimo 7 caracteres',
    'string.max': 'Teléfono debe tener máximo 15 caracteres',
    'any.required': 'Teléfono es requerido'
  });

export const direccion = Joi.string().min(5).max(200).trim()
  .messages({
    'string.min': 'Dirección debe tener mínimo 5 caracteres',
    'string.max': 'Dirección debe tener máximo 200 caracteres',
    'any.required': 'Dirección es requerida'
  });

export const ciudad = Joi.string().min(2).max(50).trim()
  .messages({
    'string.min': 'Ciudad debe tener mínimo 2 caracteres',
    'string.max': 'Ciudad debe tener máximo 50 caracteres',
    'any.required': 'Ciudad es requerida'
  });

export const activo = Joi.boolean()
  .messages({
    'boolean.base': 'Activo debe ser verdadero o falso'
  });

export const createClienteDto = Joi.object({
  tipoDocumento: tipoDocumento.required(),
  numeroDocumento: numeroDocumento.required(),
  nombre: nombre.required(),
  email: email.required(),
  telefono: telefono.required(),
  direccion: direccion.required(),
  ciudad: ciudad.required()
});

export const updateClienteDto = Joi.object({
  tipoDocumento: tipoDocumento,
  numeroDocumento: numeroDocumento,
  nombre: nombre,
  email: email,
  telefono: telefono,
  direccion: direccion,
  ciudad: ciudad
});