
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://nexlearn.noviindusdemosites.in';

export const API_ENDPOINTS = {
  sendOtp: '/auth/send-otp',
  verifyOtp: '/auth/verify-otp',
  profile:"/auth/create-profile",
  getQuestions: '/question/list',
  submitTest:"/answers/submit",
  logout:"/auth/logout"
};

export const getApiUrl = (endpoint) => {
  const baseUrl = API_BASE_URL.replace(/\/$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

