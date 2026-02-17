/**
 * Load ~/.ssh/be/.env before any other app code so DB_*, PORT, etc. are set
 * regardless of process cwd. Must be imported first in server_be.js.
 * ~ is the user home directory (e.g. /Users/a on Mac, /Users/a on Ubuntu).
 */
import dotenv from 'dotenv';
import path from 'path';
import os from 'os';
import fs from 'fs';

const homeEnvPath = path.join(os.homedir(), '.ssh', 'be', '.env');
const fileExists = fs.existsSync(homeEnvPath);
const hadDbHostBefore = !!process.env.DB_HOST;

console.log('[loadEnv] Resolved be/.env path:', homeEnvPath);
console.log('[loadEnv] File exists at that path:', fileExists);
if (hadDbHostBefore) {
  console.log('[loadEnv] DB_HOST already set in process environment (before loading file) – env may come from shell/PM2/systemd, not from ~/.ssh/be/.env');
}

let result = dotenv.config({ path: homeEnvPath });

if (result.error) {
  console.error('[loadEnv] Failed to load .env:', result.error.message);
  console.error('[loadEnv] Tried path:', homeEnvPath);
}
if (result.parsed && Object.keys(result.parsed).length > 0) {
  console.log('[loadEnv] Loaded', Object.keys(result.parsed).length, 'vars from file:', homeEnvPath);
  process.env.__ENV_SOURCE = homeEnvPath;
} else if (process.env.DB_HOST) {
  console.log('[loadEnv] DB_* (and other vars) are from process environment, NOT from file ~/.ssh/be/.env');
  process.env.__ENV_SOURCE = 'process environment (not from ~/.ssh/be/.env)';
} else {
  process.env.__ENV_SOURCE = 'none';
}
if (!process.env.DB_HOST) {
  const exists = fs.existsSync(homeEnvPath);
  console.error('[loadEnv] DB_HOST still undefined. File exists?', exists, 'Path:', homeEnvPath);
  console.error('[loadEnv] Create ~/.ssh/be/.env with DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD (and SMTP_*, TWILIO_* as needed).');
}
