
import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import router from '@/router'
import eventBus from '@/utils/eventBus' // Import event bus for application-wide notifications

/**
 * Create Axios instance with default configuration
 * - Sets base URL from environment variables with fallback
 * - Configures default headers for JSON API
 * - Sets reasonable timeout (30 seconds)
 */
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30000, // 30 seconds before request times out
})

/**
 * Request Interceptor
 * Automatically attaches authorization token to outgoing requests
 *
 * This will be removed when implementing HttpOnly cookies for authentication
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Get token from localStorage (temporary until HttpOnly cookie implementation)
    const token = localStorage.getItem('token')

    // Add Authorization header if token exists
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  // Handle request errors (network issues, etc.)
  (error: AxiosError) => Promise.reject(error),
)

/**
 * Response Interceptor
 * Handles common API errors globally across the application:
 * - Authentication errors (401): Logs user out and redirects to login
 * - Permission errors (403): Shows access denied message
 * - Not found errors (404): Shows resource not found message
 * - Server errors (500+): Shows generic error message
 *
 * Uses the eventBus to display toast notifications for better user experience
 */
api.interceptors.response.use(
  // Pass through successful responses without modification
  (response) => response,

  // Handle error responses
  async (error: AxiosError) => {
    const status = error.response?.status

    // Handle authentication errors (401: Unauthorized)
    if (status === 401) {
      // Clear authentication token
      localStorage.removeItem('token')

      // Notify user their session has expired
      eventBus.emit('toast', {
        severity: 'warn',
        summary: 'Session Expired',
        detail: 'Please log in again.',
      })

      // Redirect to login page if not already there
      if (router.currentRoute.value.path !== '/login') {
        router.push('/login')
      }
    }

    // Handle permission errors (403: Forbidden)
    if (status === 403) {
      eventBus.emit('toast', {
        severity: 'warn',
        summary: 'Access Denied',
        detail: 'You do not have permission to access this resource.',
      })
    }

    // Handle not found errors (404: Not Found)
    if (status === 404) {
      eventBus.emit('toast', {
        severity: 'warn',
        summary: 'Not Found',
        detail: 'The requested resource was not found.',
      })
    }

    // Handle server errors (500+: Internal Server Error, etc.)
    if (status && status >= 500) {
      eventBus.emit('toast', {
        severity: 'error',
        summary: 'Server Error',
        detail: 'Something went wrong. Please try again later.',
      })
    }

    // Propagate the error to the caller for local handling if needed
    return Promise.reject(error)
  },
)

export default api
