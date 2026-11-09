import axios from 'axios'
import { readSession } from '../utils/storage'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: { Accept: 'application/json' },
  timeout: 30000,
})

api.interceptors.request.use((config) => {
  const { token } = readSession()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = String(error?.config?.url || '')
    const isAuthAttempt = url.includes('/auth/login') || url.includes('/auth/register')
    if (error?.response?.status === 401 && !isAuthAttempt) {
      window.dispatchEvent(new Event('auth:unauthorized'))
    }
    return Promise.reject(error)
  },
)

export function getErrorMessage(error) {
  if (error instanceof Error && !error.response && error.message && !error.isAxiosError) {
    if (error.message && !String(error.message).startsWith('Request failed')) return error.message
  }
  const status = error?.response?.status
  const data = error?.response?.data
  if (typeof data === 'string' && data.trim()) return data
  if (data?.message) return data.message
  if (typeof data?.error === 'string') return data.error
  if (status === 401) return 'Your session has ended. Sign in again.'
  if (status === 403) return 'You do not have permission to do this.'
  if (status === 404) return 'The server does not provide this action yet.'
  if (error?.code === 'ECONNABORTED') return 'The request timed out. Please try again.'
  if (!error?.response) return 'Unable to reach the server. Check your connection and the API address.'
  return 'Something went wrong. Please try again.'
}

export function getFieldErrors(error) {
  const errors = error?.response?.data?.errors
  if (!errors || typeof errors !== 'object') return {}
  if (Array.isArray(errors)) {
    return Object.fromEntries(
      errors
        .map((item) => [item.field || item.path || item.param, item.message || item.msg])
        .filter(([field, message]) => field && message),
    )
  }
  return errors
}

export function applyFieldErrors(error, setError) {
  const fieldErrors = getFieldErrors(error)
  Object.entries(fieldErrors).forEach(([key, message]) => {
    const text = Array.isArray(message) ? message[0] : message
    if (text && key !== 'message') setError(key, { message: String(text) })
  })
}

export default api
