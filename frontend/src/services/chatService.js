import api from './api'
import { endpoints } from './endpoints'

export async function send(body) {
  const { data } = await api.post(endpoints.chat, body)
  return data
}

export async function history() {
  const { data } = await api.get(endpoints.chatHistory)
  return data
}

export async function clear() {
  const { data } = await api.delete(endpoints.chatHistory)
  return data
}
