/**
 * In-memory store for registration/create-password and phone verification.
 * Format: { token: { email, expiresAt } }
 */
export const createPasswordTokens = new Map();
export const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * In-memory storage for user data during phone verification.
 * Format: { email_phone: { password, email, phone } }
 */
export const pendingVerifications = new Map();
