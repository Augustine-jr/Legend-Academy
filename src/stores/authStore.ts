import { defineStore } from 'pinia'
import { authService, type User } from '@/services/authService'
import router from '@/router'

// Default user structure
const defaultUser: User = {
  id: '',
  name: '',
  email: '',
  role: '',
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: defaultUser as User | null, // Holds authenticated user details
    token: localStorage.getItem('token') || null, // Retrieve token from localStorage on initialization
    loading: false, // Tracks loading state for API requests
  }),

  getters: {
    isAuthenticated: (state) => !!state.user, // Returns true if a token exists (user is logged in)
    isAdmin: (state) => state.user?.role === 'admin', // Checks if user is an admin
  },

  actions: {
    // Stores user details and token after successful login
    // TODO: Replace localStorage with HttpOnly cookies for security
    setUser(user: User, token: string) {
      this.user = user
      this.token = token
      localStorage.setItem('token', token)
    },

    /**
     * Handles user login by calling authService
     * - Sets loading state
     * - Calls API to authenticate user
     * - Stores token & user details
     * - Fetches additional user data after login
     */
    async login(credentials: { email: string; password: string }) {
      this.loading = true
      try {
        const { user, token } = await authService.login(credentials)
        this.setUser(user, token)
        await this.fetchUser() // Fetch updated user details
      } catch (error) {
        console.error('Login failed', error)
        throw error // Ensure the error is handled in the UI
      } finally {
        this.loading = false
      }
    },
    /**
     * Fetches user details from the backend
     * - Only runs if a token is available
     * - If user fetch fails, logs the user out
     */
    async fetchUser() {
      if (!this.token) return // Do nothing if no token is available
      try {
        const user = await authService.fetchUser()
        this.user = user
      } catch (error) {
        console.error('Failed to fetch user', error)
        this.logout() // Logout if token is invalid or expired
      }
    },

    /**
     * Logs the user out
     * - Calls backend logout API (optional)
     * - Clears user state & token
     * - Redirects to login page
     */
    logout() {
      authService.logout().catch((err) => console.error('Error during logout', err))
      this.user = null
      this.token = null
      localStorage.removeItem('token') // Remove token from storage

      // Redirect to login page
      router.push('/login')
    },
  },

  persist: true, // Persist the store state across page reloads
})
