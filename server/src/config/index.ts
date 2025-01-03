import { z } from 'zod';

const envSchema = z.object({
  DB_NAME: z.string().min(2, 'El nombre de la base de datos es querida'),
  DB_USER: z.string().min(2, 'El usuario de la base de datos es querida'),
  DB_PASS: z.string().min(2, 'La contraseña de la base de datos es querida'),
  DB_HOST: z.string().min(2, 'El host de la base de datos es querida'),
  DB_PORT: z.preprocess((val) => Number(val), z.number({
    message: 'El puerto de la base de datos debe ser un número',
    required_error: 'el puerto de la base de datos es requerido',
  })),
  PORT: z.preprocess((val) => Number(val), z.number({
    message: 'El puerto debe ser un número',
    required_error: 'el puerto es requerido',
  })),
  CORS_ORIGINS: z.string().min(2, 'Los orígenes permitidos para CORS son requeridos'),
})

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  console.error('Error en la configuración de las variables de entorno: ', error.format());
  process.exit(1);
}

export const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  PORT,
  CORS_ORIGINS
} = data;