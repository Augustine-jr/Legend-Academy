import api from '@/utils/api'


// Define the structure for login request payload
export interface LoginCredentials {
  email: string;
  password: string;
}


// Define the structure of the server response after login 
export interface AuthResponse {
  user: User; // contains the user details 
  token: string; // JWT token
}

// Define the structure for user object
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// AuthService to handle authentication API requests
export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Send a POST request to login
      const { data } = await api.post<AuthResponse>('/auth/login', credentials)
      return data // Return user details and token
    } catch (error) {
      console.error('Login failed', error)
      throw error // Foward error to the calling function
    }
  },
  // Fetches the authenticated user's details from the backend
  async fetchUser(): Promise<User> {
    try {
      // Send a GET request to fetch user details
      const { data } = await api.get<User>('/auth/user')
      return data // Return user details
    } catch (error) {
      console.error('Fetching user failed', error)
      throw error // Forward error to the calling function
    }
  },
  // Logout function - clears the token from localStorage and user details from the store
  async logout(): Promise<void> {
    try {
      // Send a POST request to logout
      await api.post('/auth/logout') // TODO: Implement this in the backend
    } catch (error) {
      console.warn('Logout failed', error)
      // Even if the API fails, we proceed with clearing local session data
    }
  },
}