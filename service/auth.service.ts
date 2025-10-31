import { environment } from '@/environment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const TOKEN_KEY = 'auth.token';

export const authApi = axios.create({
  baseURL: environment.apiUrl,
  headers: { 'Content-Type': 'application/json' },
});

authApi.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
  }
  return config;
});

/**
 * Faz login e armazena o token JWT no AsyncStorage.
 */
export async function loginRequest(email: string, password: string) {
  const res = await authApi.post('/auth/login', { email, password });
  const data = res.data;
  if (data?.token) {
    await AsyncStorage.setItem(TOKEN_KEY, data.token);
  }
  return data;
}

export async function logout() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

export async function getToken() {
  return AsyncStorage.getItem(TOKEN_KEY);
}