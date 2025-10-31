const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
console.log('API_URL:', API_URL);

// Validate endpoint to prevent SSRF
const validateEndpoint = (endpoint) => {
  if (typeof endpoint !== 'string' || !endpoint.startsWith('/api/')) {
    throw new Error('Invalid API endpoint');
  }
  return endpoint;
};

// Handle API responses with error checking
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error: ${response.status} - ${error}`);
  }
  return response.json();
};

const api = {
  get: async (endpoint) => {
    validateEndpoint(endpoint);
    const fullUrl = `${API_URL}${endpoint}`;
    console.log('Making request to:', fullUrl);
    const response = await fetch(fullUrl);
    return handleResponse(response);
  },
  
  post: async (endpoint, data) => {
    validateEndpoint(endpoint);
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },
  
  put: async (endpoint, data) => {
    validateEndpoint(endpoint);
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },
  
  delete: async (endpoint) => {
    validateEndpoint(endpoint);
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE'
    });
    return handleResponse(response);
  }
};

export default api;