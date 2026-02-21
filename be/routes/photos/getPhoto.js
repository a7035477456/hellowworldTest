import pool from '../../db/connection.js';

/**
 * GET /api/photo/:id
 * Serves image bytes from public.photos for the given photos_id.
 * singles.profile_image_fk points to photos.photos_id.
 */
export async function getPhoto(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id) || id < 1) {
      return res.status(400).json({ error: 'Invalid photo id' });
    }
    const result = await pool.query(
      `SELECT image_data, content_type FROM public.photos WHERE photos_id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    const { image_data, content_type } = result.rows[0];
    const contentType = content_type || 'image/jpeg';
    res.set('Content-Type', contentType);
    res.set('Cache-Control', 'public, max-age=86400');
    res.send(image_data);
  } catch (error) {
    console.error('Error serving photo:', error);
    res.status(500).json({ error: 'Failed to load photo' });
  }
}
