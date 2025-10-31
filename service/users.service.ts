import { logout as authLogout, getToken, loginRequest } from './auth.service';

/**
 * Wrapper para login via backend (JWT)
 */
export async function loginBackend(email: string, password: string) {
  return loginRequest(email, password);
}

/**
 * Logout (remove token)
 */
export async function logoutBackend() {
  return authLogout();
}

/**
 * Retorna token atual (se houver)
 */
export async function currentToken() {
  return getToken();
}