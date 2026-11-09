import api from './api'
import { endpoints } from './endpoints'
import { normalizeAppointment, unwrapData, unwrapList } from '../utils/normalize'

export async function list(params) {
  const { data } = await api.get(endpoints.appointments, { params })
  const { items, meta } = unwrapList(data)
  return { items: items.map(normalizeAppointment).filter(Boolean), meta }
}

export async function create(body) {
  const { data } = await api.post(endpoints.appointments, body)
  return normalizeAppointment(unwrapData(data)) || data
}

export async function update(id, body) {
  const { data } = await api.put(endpoints.appointment(id), body)
  return normalizeAppointment(unwrapData(data)) || data
}
