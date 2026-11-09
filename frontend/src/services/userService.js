import api from './api'
import { endpoints } from './endpoints'
import { normalizeEnquiry, normalizeUser, unwrapData, unwrapList } from '../utils/normalize'

export async function getProfile() {
  const { data } = await api.get(endpoints.profile)
  return normalizeUser(unwrapData(data)) || normalizeUser(data)
}

export async function updateProfile(body) {
  const { data } = await api.put(endpoints.profile, body)
  return normalizeUser(unwrapData(data)) || normalizeUser(data)
}

export async function listEnquiries(params) {
  const { data } = await api.get(endpoints.enquiries, { params })
  const { items, meta } = unwrapList(data)
  return { items: items.map(normalizeEnquiry).filter(Boolean), meta }
}

export async function respondToEnquiry(id, body) {
  const { data } = await api.post(endpoints.enquiryRespond(id), body)
  return data
}

export async function sendContact(body) {
  const { data } = await api.post(endpoints.contact, body)
  return data
}

export async function testimonials() {
  const { data } = await api.get(endpoints.testimonials)
  const { items } = unwrapList(data)
  return items
}
