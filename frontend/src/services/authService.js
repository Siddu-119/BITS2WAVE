import api from './api'
import { endpoints } from './endpoints'

export async function register(body) {
  const { data } = await api.post(endpoints.register, body)
  return data
}

export async function login(credentials) {
  const { data } = await api.post(endpoints.login, credentials)
  return data
}

export async function forgotPassword(body) {
  const { data } = await api.post(endpoints.forgotPassword, body)
  return data
}

export async function resetPassword(body) {
  const { data } = await api.post(endpoints.resetPassword, body)
  return data
}

export async function changePassword(body) {
  const { data } = await api.post(endpoints.changePassword, body)
  return data
}
