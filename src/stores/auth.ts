import { defineStore } from "pinia";
import api from "@/utils/api";

// Define the structure of the user object

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null, // Stores authenticated user details
    token: localStorage.getItem('token') || null, // TODO: Move token storage to HttpOnly cookies in the backend
    loading: false, // Tracks API requests (useful for loaders)
  }),

  getters: {
    isAuthenticated: (state) => !!state.token, // Returns true if a token exists
    isAdmin: (state) => state.user?.role === 'admin', // checks if the user is an admin
  },

  actions: {
    // Login function - sends credentials to the API and stores the response
    async login(credentials: { email: string; password: string }) {
      this.loading = true // set loading to true while making the request
      try {
        const { data } = await api.post('/auth/login', credentials) // Send Login request to the API
        this.user = data.user // Store user details
        this.token = data.token // Store token // TODO: Remove this after implementing HttpOnly cookies

        localStorage.setItem('token', data.token) // Store token in localStorage

        await this.fetchUser() // Fetch updated user details
      } catch (error) {
        console.error('Login failed', error)
        throw error
      } finally {
        this.loading = false // Reset loading state after request completion
      }
    },

    // Fetch user details if a token exists
    async fetchUser() {
      if (!this.token) return // TODO: Replace this with cookie-based authentication check

      try {
        const { data } = await api.get('/user') // Send GET request to fetch user details
        this.user = data // Store user details
      } catch (error) {
        console.error('Failed to fetch user details', error)
        this.logout() // Logout if fetching user details fails
      }
    },

    // Logout function - clears user details and token, , then redirects to login page
    logout(router: any) {
  this.user = null;
  this.token = null; // TODO: Replace this with a request to invalidate the session on the backend

  localStorage.removeItem('token'); // TODO: Remove this after implementing HttpOnly cookies
  
  router.push('/login'); // Use Vue Router instead of window.location.href
}

  },
  // Enables automatic state persistence
  persist: true,
}) ;