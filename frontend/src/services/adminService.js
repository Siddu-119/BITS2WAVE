import api from './api'
import { endpoints } from './endpoints'
import { normalizeAppointment, normalizeDashboard, normalizeDocument, normalizeLawyer, normalizeUser, unwrapData, unwrapList } from '../utils/normalize'

export async function dashboard() {
  const { data } = await api.get(endpoints.adminDashboard)
  return normalizeDashboard(data)
}

export async function users(params) {
  const { data } = await api.get(endpoints.adminUsers, { params })
  const { items, meta } = unwrapList(data)
  return {
    items: items
      .map((item) => {
        const user = normalizeUser(item) || normalizeUser({ ...item, role: item.role || 'client' })
        if (!user) return null
        return { ...user, status: String(item.status || item.accountStatus || 'active').toLowerCase(), createdAt: item.createdAt || '' }
      })
      .filter(Boolean),
    meta,
  }
}

export async function updateUserStatus(id, body) {
  const { data } = await api.put(endpoints.adminUserStatus(id), body)
  return data
}

export async function lawyers(params) {
  const { data } = await api.get(endpoints.adminLawyers, { params })
  const { items, meta } = unwrapList(data)
  return { items: items.map(normalizeLawyer).filter(Boolean), meta }
}

export async function pendingLawyers(params) {
  const { data } = await api.get(endpoints.adminPendingLawyers, { params })
  const { items, meta } = unwrapList(data)
  return { items: items.map(normalizeLawyer).filter(Boolean), meta }
}

export async function approveLawyer(id) {
  const { data } = await api.put(endpoints.approveLawyer(id))
  return unwrapData(data) || data
}

export async function rejectLawyer(id, body) {
  const { data } = await api.put(endpoints.rejectLawyer(id), body)
  return unwrapData(data) || data
}

export async function appointments(params) {
  const { data } = await api.get(endpoints.adminAppointments, { params })
  const { items, meta } = unwrapList(data)
  return { items: items.map(normalizeAppointment).filter(Boolean), meta }
}

export async function documents(params) {
  const { data } = await api.get(endpoints.adminDocuments, { params })
  const { items, meta } = unwrapList(data)
  return { items: items.map(normalizeDocument).filter(Boolean), meta }
}
