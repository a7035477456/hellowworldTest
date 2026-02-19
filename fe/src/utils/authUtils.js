/**
 * Shared logout: clear session and storage, then redirect to login.
 * Used by ProfileSection (Logout) and SessionTimeout (auto-logout).
 */
export function doLogout() {
  sessionStorage.clear();
  try {
    const authKeys = ['vsingles-auth', 'token', 'authToken', 'user'];
    authKeys.forEach((key) => localStorage.removeItem(key));
  } catch (_) {}
  window.location.replace('/pages/login');
}
