import store from '../store'
import ApiService from './api'

const apiService = new ApiService()

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
}

interface AuthResponse {
  success: boolean
  message?: string
  user?: {
    id: number
    name: string
    email: string
  }
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await apiService.post('/auth/login', data)

      if (response.success && response.data.success) {
        store.mutations.setAuth(response.data.data.user)

        return {
          success: true,
          user: response.data,
        }
      } else {
        return {
          success: false,
          message: response.data.message || 'Erreur de connexion',
        }
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
      return {
        success: false,
        message: 'Erreur de connexion au serveur',
      }
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiService.post('/auth/register', data)

      if (response.success && response.data.success) {
        console.log(response.data)
        store.mutations.setAuth(response.data.data)

        return {
          success: true,
          user: response.data.data.user,
        }
      } else {
        return {
          success: false,
          message: response.data.message || "Erreur lors de l'inscription",
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
      return {
        success: false,
        message: 'Erreur de connexion au serveur',
      }
    }
  },

  async logout() {
    try {
      await apiService.post('/auth/logout', {})
      window.location.href = '/'
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    } finally {
      store.mutations.logout()
    }
  },
}
