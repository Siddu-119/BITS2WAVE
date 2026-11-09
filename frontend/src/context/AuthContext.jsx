import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as authService from '../services/authService'
import { clearSession, readSession, writeSession } from '../utils/storage'
import { readAuthPayload } from '../utils/normalize'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const existing = readSession()
  const [user, setUser] = useState(existing.user)

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  useEffect(() => {
    const onUnauthorized = () => logout()
    window.addEventListener('auth:unauthorized', onUnauthorized)
    return () => window.removeEventListener('auth:unauthorized', onUnauthorized)
  }, [logout])

  const establish = useCallback((payload, { expectedRole } = {}) => {
    const { token, user: nextUser } = readAuthPayload(payload)
    if (!token || !nextUser?.role) {
      const error = new Error('The server did not return a usable account session.')
      error.code = 'NO_SESSION'
      throw error
    }
    if (expectedRole && nextUser.role !== expectedRole) {
      throw new Error('This entrance is only for administrator accounts.')
    }
    if (!expectedRole && nextUser.role === 'admin') {
      throw new Error('Administrators must use the admin sign-in page.')
    }
    writeSession(token, nextUser)
    setUser(nextUser)
    return nextUser
  }, [])

  const login = useCallback(async (credentials, options) => {
    const payload = await authService.login(credentials)
    return establish(payload, options)
  }, [establish])

  const register = useCallback(async (body) => authService.register(body), [])

  const updateUser = useCallback((partial) => {
    setUser((current) => {
      if (!current) return current
      const next = { ...current, ...partial }
      const { token } = readSession()
      if (token) writeSession(token, next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ user, login, register, logout, updateUser, establish }),
    [user, login, register, logout, updateUser, establish],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('Authentication is unavailable outside AuthProvider.')
  return context
}
