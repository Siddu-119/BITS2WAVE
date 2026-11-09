import api from './api'
import { endpoints } from './endpoints'
import { normalizeDocument, unwrapList } from '../utils/normalize'

export async function list(params) {
  const { data } = await api.get(endpoints.documents, { params })
  const { items, meta } = unwrapList(data)
  return { items: items.map(normalizeDocument).filter(Boolean), meta }
}

export async function upload(fields, file) {
  const form = new FormData()
  Object.entries(fields).forEach(([key, value]) => form.append(key, value))
  form.append('file', file)
  const { data } = await api.post(endpoints.documents, form)
  return data
}

export async function download(id, filename) {
  const response = await api.get(endpoints.documentDownload(id), { responseType: 'blob' })
  const contentType = response.headers['content-type'] || ''
  if (contentType.includes('application/json')) {
    const text = await response.data.text()
    const json = JSON.parse(text)
    if (json.url) {
      window.open(json.url, '_blank', 'noopener,noreferrer')
      return
    }
    throw new Error(json.message || 'The server did not return a file.')
  }
  const url = URL.createObjectURL(response.data)
  const link = document.createElement('a')
  link.href = url
  link.download = filename || 'document'
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
