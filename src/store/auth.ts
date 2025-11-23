// Import the 'create' function from the 'zustand' library to create a store
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the interface for the authentication state
interface AuthState {
  isAuthenticated: boolean; // Indicates if the user is logged in
  userEmail: string; // Stores the email of the logged-in user
  credits: number; // Stores the user's current credit balance
  spentThisMonth: number; // Stores the amount spent by the user this month
  activeThreads: number; // Stores the number of active threads for the user
  isLoading: boolean; // Indicates if authentication check is in progress
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>; // Function to handle user login
  logout: () => Promise<void>; // Function to handle user logout
  checkAuth: () => Promise<void>; // Function to check authentication status
  addCredits: (amount: number) => void; // Function to add credits to the user's account
}

/**
 * The authentication store created using Zustand.
 * It manages the state and actions related to user authentication and account information.
 * Uses JWT tokens stored in httpOnly cookies for secure authentication.
 * Persists credits, spentThisMonth, and activeThreads to localStorage.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
  // Initial state values
  isAuthenticated: false,
  userEmail: '',
  credits: 5000,
  spentThisMonth: 1500,
  activeThreads: 10,
  isLoading: true,

  /**
   * Checks the authentication status by calling the verify API.
   * This is called on app initialization to sync state with server.
   */
  checkAuth: async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          set({
            isAuthenticated: true,
            userEmail: data.user?.email || '',
            isLoading: false,
          });
        } else {
          set({ isAuthenticated: false, userEmail: '', isLoading: false });
        }
      } else {
        set({ isAuthenticated: false, userEmail: '', isLoading: false });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      set({ isAuthenticated: false, userEmail: '', isLoading: false });
    }
  },

  /**
   * Logs in the user by calling the login API route.
   * The API validates credentials, generates a JWT token, and sets an httpOnly cookie.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<object>} A promise that resolves to an object indicating success or failure.
   */
  login: async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Update state on successful login
        set({
          isAuthenticated: true,
          userEmail: data.user?.email || email,
        });
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  },

  /**
   * Logs out the user by calling the logout API route.
   * The API clears the httpOnly authentication cookie.
   */
  logout: async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always update state, even if API call fails
      set({ isAuthenticated: false, userEmail: '' });
    }
  },

  /**
   * Adds a specified amount to the user's credit balance.
   * @param {number} amount - The amount of credits to add.
   */
  addCredits: (amount) => set((state) => ({ credits: state.credits + amount })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        credits: state.credits,
        spentThisMonth: state.spentThisMonth,
        activeThreads: state.activeThreads,
      }),
    }
  )
);