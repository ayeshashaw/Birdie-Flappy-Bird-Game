const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://birdie-flappy-bird-game.onrender.com';

const httpAction = async ({ url, method = 'GET', body }) => {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    return await response.json();
    const fullUrl = `${baseUrl}${url}`;
console.log("🔍 Final API URL:", fullUrl);

  } catch (error) {
    console.error('HTTP Action Error:', error.message);
    throw error;
  }
};

export default httpAction;
