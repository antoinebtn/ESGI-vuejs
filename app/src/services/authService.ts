import store from '../store'

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
  token?: string
  user?: {
    id: number
    name: string
    email: string
  }
}

const mockUsers = [
  {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  }
]

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const user = mockUsers.find(u => u.email === data.email && u.password === data.password)

    if (!user) {
      return {
        success: false,
        message: 'Email ou mot de passe incorrect'
      }
    }

    const token = 'mock-jwt-token'

    store.mutations.setAuth(token, {
      id: user.id,
      name: user.name,
      email: user.email
    })

    return {
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    if (mockUsers.some(u => u.email === data.email)) {
      return {
        success: false,
        message: 'Cet email est déjà utilisé'
      }
    }

    const newUser = {
      id: mockUsers.length + 1,
      name: data.name,
      email: data.email,
      password: data.password
    }

    mockUsers.push(newUser)

    const token = 'mock-jwt-token'

    store.mutations.setAuth(token, {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    })

    return {
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    }
  },

  logout() {
    store.mutations.logout()
  },
}
