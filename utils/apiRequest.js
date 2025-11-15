"use client";

import { getApiUrl } from "../config/api";

const isBrowser = () => typeof window !== "undefined";

// Helper to get token from localStorage
const getToken = () => {
  if (isBrowser()) {
    return localStorage.getItem("token") || "";
  }
  return "";
};

// Helper to get language from localStorage
const getLanguage = () => {
  if (isBrowser()) {
    const lng = localStorage.getItem("lng");
    if (lng) {
      try {
        const parsed = JSON.parse(lng);
        return parsed?.code || "";
      } catch (e) {
        return "";
      }
    }
  }
  return "";
};

const APIRequest = {

  multipartFormDataRequest: async function (method, endpoint, body = null) {
    const url = getApiUrl(endpoint);

    let config = {
      method: method,
      headers: {
        "Accept-Language": getLanguage(),
      },
    };

    // Add auth token
    if (isBrowser()) {
      const token = getToken();
      if (token) {
        const normalizedToken = token.startsWith("Bearer ")
          ? token
          : `Bearer ${token}`;
        config.headers["Authorization"] = normalizedToken;
      }
    }

    // Add body if provided
    if (body) {
      config.body = body;
    }

    try {
      const response = await fetch(url, config);

      // Handle token refresh from response headers
      if (isBrowser() && response.headers) {
        const newToken = response.headers.get("Authorization");
        if (newToken) {
          const token = newToken.replace(/^Bearer\s+/i, "");
          localStorage.setItem("token", token);
        }
      }

      // Parse response
      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = {
          returncode: 0,
          errors: [{ errormsg: text || "Invalid response format" }],
        };
      }

      return this.returnResponse(data, response);
    } catch (error) {
      console.error("Multipart API Request Error:", error);
      return {
        returncode: 0,
        errors: [{ errormsg: error.message || "Timeout Error." }],
      };
    }
  },

  returnResponse: async function (response, httpResponse) {
    // Handle status field in response
    if (
      response.status !== undefined &&
      response.status !== null &&
      response.status !== 200
    ) {
      return {
        returncode: 0,
        errors: [
          { errormsg: response.error || response.message || "Request failed" },
        ],
      };
    }


    // Return response as-is for other cases
    return Promise.resolve(response);
  },

  // Convenience methods
  get: function (endpoint, options = {}) {
    return this.request("GET", endpoint, null, options);
  },

  post: function (endpoint, body, options = {}) {
    return this.request("POST", endpoint, body, options);
  },

  put: function (endpoint, body, options = {}) {
    return this.request("PUT", endpoint, body, options);
  },

  delete: function (endpoint, options = {}) {
    return this.request("DELETE", endpoint, null, options);
  },

  patch: function (endpoint, body, options = {}) {
    return this.request("PATCH", endpoint, body, options);
  },
};

export default APIRequest;
