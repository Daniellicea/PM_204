import { Platform } from 'react-native';

export const API_HOST = '192.168.100.39';
export const API_PORT = '5000';

export const BASE_API_URL =
  Platform.OS === 'web'
    ? `http://localhost:${API_PORT}/v1/usuarios/`
    : `http://${API_HOST}:${API_PORT}/v1/usuarios/`;
