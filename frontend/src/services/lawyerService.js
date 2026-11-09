import api from './api'
import { endpoints } from './endpoints'
import { normalizeLawyer, unwrapData, unwrapList } from '../utils/normalize'

export async function list(params) {
  const { data } = await api.get(endpoints.lawyers, { params })
  const { items, meta } = unwrapList(data)
  return { items: items.map(normalizeLawyer).filter(Boolean), meta }
}

export async function getById(id) {
  const { data } = await api.get(endpoints.lawyer(id))
  return normalizeLawyer(unwrapData(data))
}

export async function updateProfile(values, files = {}) {
  if (files.photo || files.document) {
    const form = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      if (value === undefined || value === null) return
      form.append(key, typeof value === 'object' ? JSON.stringify(value) : value)
    })
    if (files.photo) form.append('photo', files.photo)
    if (files.document) form.append('document', files.document)
    const { data } = await api.put(endpoints.lawyerProfile, form)
    return normalizeLawyer(unwrapData(data))
  }
  const { data } = await api.put(endpoints.lawyerProfile, values)
  return normalizeLawyer(unwrapData(data))
}

export async function getAvailability() {
  const { data } = await api.get(endpoints.availability)
  return data
}

export async function updateAvailability(availability) {
  const { data } = await api.put(endpoints.availability, { availability })
  return data
}
