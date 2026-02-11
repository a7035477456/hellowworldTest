/**
 * Load be/.env before any other app code so DB_*, PORT, etc. are set
 * regardless of process cwd. Must be imported first in server_be.js.
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '.env');
dotenv.config({ path: envPath });
