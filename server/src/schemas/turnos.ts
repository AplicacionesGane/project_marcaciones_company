import { z } from 'zod';

export const turnoSchema = z.object({
  id: z.number().optional(),
  codigo: z.string({
    message: 'el código debe ser una cadena de texto entre 2 a 10 caracteres',
    required_error: 'el código es requerido',
  }).min(2).max(10),
  descripcion: z.string({
    message: 'la descripción debe ser una cadena de texto entre 3 a 120 caracteres',
    required_error: 'la descripción es requerida',
  }).min(3).max(120),
  hora_inicio: z.string({
    message: 'la hora de inicio debe ser una cadena de texto',
    required_error: 'la hora de inicio es requerida',
  }),
  hora_fin: z.string({
    message: 'la hora de fin debe ser una cadena de texto',
    required_error: 'la hora de fin es requerida',
  }),
  hora_inicio_break: z.string({
    message: 'la hora de inicio de brake debe ser una cadena de texto',
    required_error: 'la hora de inicio de brake es requerida',
  }),
  tiempo_breack: z.string({
    message: 'el tiempo de brake debe ser una cadena de texto',
    required_error: 'el tiempo de brake es requerido',
  }),
  hora_fin_break: z.string({
    message: 'la hora de fin de brake debe ser una cadena de texto',
    required_error: 'la hora de fin de brake es requerida',
  }),
  teorico: z.string({
    message: 'el teórico debe ser una cadena de texto',
    required_error: 'el teórico es requerido',
  }),
  conceptos: z.string({
    message: 'los conceptos deben ser una cadena de texto',
    required_error: 'los conceptos son requeridos',
  }),
});

export const verifyturno = async (turno: unknown) => {
  return await turnoSchema.safeParseAsync(turno);
}