import { URL_API_LOGIN, APP_NAME } from '@config/enviroments';
import axios from 'axios';

interface LoginResponse {
  success: boolean;
  msg: string;
}

export const loginService = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const res = await axios.post(`${URL_API_LOGIN}/login`, { username, password, app: APP_NAME });
    if (res.status === 200) {
      return { success: true, msg: 'Inicio de sesión exitoso' };
    }
    return { success: false, msg: 'Error desconocido' };
  } catch (error) {
    console.error(error);
    return handleAxiosError(error);
  }
};

const handleAxiosError = (error: unknown): LoginResponse => {
  if (axios.isAxiosError(error)) {
    if (error.message === 'Network Error') {
      return { success: false, msg: 'Error de conexión, y/o red, Contacte al administrador del sistema' };
    }

    if (error.response?.status === 400 || error.response?.status === 401) {
      return { success: false, msg: error.response.data.description };
    }

    return { success: false, msg: error.response?.data.description || 'Error desconocido' };
  }

  return { success: false, msg: 'Error desconocido' };
};