import pool from '../../db/connection.js';

export async function getSinglesRequest(req, res) {
  try {
    const result = await pool.query(
      `SELECT s.singles_id, r.*
       FROM public.singles s
       JOIN public.requests r ON s.singles_id = r.singles_id_from
       ORDER BY s.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching singles requests:', error);
    res.status(500).json({ error: 'Failed to fetch singles from database' });
  }
}
