const BASE_URL = 'https://quizgecko.com/api/v1/quiz';
// const headers={ Authorization: "Bearer 1LMkkOzwpu1s0nsepQsOe4sZkTnmTJgr52opDmw0", "Content-Type": "application/json" }

// Generic Fetch Request Wrapper
interface FetchOptions {
  method?: string;
  body?: unknown;
}

const fetchClient = async (
  endpoint: string,
  { method = 'GET', body }: FetchOptions = {}
) => {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method,
      // headers,
      body: body ? JSON.stringify(body) : null,
    });

    // Check if response is successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    // Parse JSON response
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('Fetch API Error:', error.message);
    } else {
      console.error('Fetch API Error:', error);
    }
    throw error;
  }
};

export default fetchClient;
