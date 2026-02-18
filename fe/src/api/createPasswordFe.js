const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:40000');

export const createPassword = async (token, email, password, phone) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/createPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token, email, password, phone })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const msg = errorData.reason === 'TOKEN_NOT_FOUND'
        ? 'This link was not found. If you just received this email, the server may have restarted—please request a new registration email.'
        : (errorData.error || 'Failed to create password');
      throw new Error(msg);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating password:', error);
    throw error;
  }
};
