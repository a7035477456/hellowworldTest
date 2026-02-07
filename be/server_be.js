import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  verifyLoginPassword,
  registerUser_FFFFFFFF,
  getAllSingles_BBBBBBBB,
  getVettedSingles_CCCCCCCC,
  getSinglesInterested_DDDDDDD,
  getSinglesRequest_EEEEEEEE,
  createPassword_GGGGGGGG,
  verifyPhone_HHHHHHHH,
} from './routes/singles/index.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 40000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check for HAProxy (httpchk GET /health)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API routes
app.post('/api/verifyPassword', verifyLoginPassword);
app.post('/api/register', registerUser_FFFFFFFF);
app.post('/api/createPassword', createPassword_GGGGGGGG);
app.post('/api/verifyPhone', verifyPhone_HHHHHHHH);
app.get('/api/allSingles', getAllSingles_BBBBBBBB);
app.get('/api/vettedSingles', getVettedSingles_CCCCCCCC);
app.get('/api/interestedSingles', getSinglesInterested_DDDDDDD);
app.get('/api/requestedSingles', getSinglesRequest_EEEEEEEE);

// Serve built frontend (fe/dist) – run fe build first (febedev/febeprod)
app.use(express.static(path.join(__dirname, '../fe/dist')));

// SPA: all other routes serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../fe/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API endpoint: http://localhost:${PORT}/api/allSingles`);
});

