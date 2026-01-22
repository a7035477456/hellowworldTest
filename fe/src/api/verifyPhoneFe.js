const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3005';

export const verifyPhone = async (email, phone, verificationCode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/verifyPhone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, phone, verificationCode })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Phone verification failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying phone:', error);
    throw error;
  }
};
