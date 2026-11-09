const TOKEN_KEY = 'rlm_token'
const USER_KEY = 'rlm_user'
export const LANGUAGE_KEY = 'rlm_language'

export function readSession() {
  try {
    const token = localStorage.getItem(TOKEN_KEY)
    const raw = localStorage.getItem(USER_KEY)
    const user = raw ? JSON.parse(raw) : null
    if (!token || !user?.role) return { token: null, user: null }
    return { token, user }
  } catch {
    return { token: null, user: null }
  }
}

export function writeSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function readPreference(key, fallback) {
  return localStorage.getItem(key) || fallback
}

export function writePreference(key, value) {
  localStorage.setItem(key, value)
}
