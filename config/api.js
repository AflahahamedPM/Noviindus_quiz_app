// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://nexlearn.noviindusdemosites.in';

// API endpoints
export const API_ENDPOINTS = {
  sendOtp: '/auth/send-otp',
  verifyOtp: '/auth/verify-otp',
  profile:"/auth/create-profile",
  getQuestions: '/question/list',
  // Add other endpoints here as needed
  // VERIFY_OTP: '/api/auth/verify-otp',
  // RESEND_OTP: '/api/auth/resend-otp',
};

// Helper function to build full API URL
export const getApiUrl = (endpoint) => {
  // Remove trailing slash from base URL and leading slash from endpoint
  const baseUrl = API_BASE_URL.replace(/\/$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

