import pool from '../db/connection.js';

export const getSingles_BBBBBBBB = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        id, 
        firstname as name, 
        lastname, 
        middlename,
        job_title, 
        vetted_description as description, 
        email, 
        phone, 
        current_city as location, 
        profile_image_url, 
        vetted_status,
        created_at, 
        updated_at 
      FROM singles 
      ORDER BY id ASC`
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Failed to fetch singles from database' });
  }
};

export const getVettedSingles = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        id, 
        firstname as name, 
        lastname, 
        middlename,
        job_title, 
        vetted_description as description, 
        email, 
        phone, 
        current_city as location, 
        profile_image_url, 
        vetted_status,
        created_at, 
        updated_at 
      FROM singles 
      WHERE vetted_status = true
      ORDER BY id ASC`
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Failed to fetch singles from database' });
  }
};

export const getSinglesInterested = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        id, 
        firstname as name, 
        lastname, 
        middlename,
        job_title, 
        vetted_description as description, 
        email, 
        phone, 
        current_city as location, 
        profile_image_url, 
        vetted_status,
        created_at, 
        updated_at 
      FROM singles 
      ORDER BY id ASC`
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Failed to fetch singles from database' });
  }
};

export const getSinglesRequestSent = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        id, 
        firstname as name, 
        lastname, 
        middlename,
        job_title, 
        vetted_description as description, 
        email, 
        phone, 
        current_city as location, 
        profile_image_url, 
        vetted_status,
        created_at, 
        updated_at 
      FROM singles 
      ORDER BY id ASC`
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Failed to fetch singles from database' });
  }
};