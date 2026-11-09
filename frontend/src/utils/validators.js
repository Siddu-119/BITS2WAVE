import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_BYTES } from './constants'

export function required(value) {
  return String(value ?? '').trim() ? true : 'This field is required.'
}

export function email(value) {
  if (!String(value ?? '').trim()) return 'Email is required.'
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim()) ? true : 'Enter a valid email address.'
}

export function phone(value) {
  const digits = String(value ?? '').replace(/[\s-]/g, '')
  return /^(?:\+91)?[6-9]\d{9}$/.test(digits) ? true : 'Enter a valid 10-digit mobile number.'
}

export function password(value) {
  const text = String(value ?? '')
  if (text.length < 8) return 'Password must be at least 8 characters.'
  if (!/[A-Za-z]/.test(text) || !/\d/.test(text)) return 'Use at least one letter and one number.'
  return true
}

export function match(other) {
  return (value) => (value === other ? true : 'Passwords do not match.')
}

export function minLength(min) {
  return (value) => (String(value ?? '').trim().length >= min ? true : `Enter at least ${min} characters.`)
}

export function maxLength(max) {
  return (value) => (String(value ?? '').length <= max ? true : `Use ${max} characters or fewer.`)
}

export function nonNegativeNumber(value) {
  if (String(value ?? '').trim() === '') return 'Experience is required.'
  const number = Number(value)
  if (!Number.isInteger(number) || number < 0 || number > 80) return 'Enter whole years from 0 to 80.'
  return true
}

export function futureDate(value) {
  if (!value) return 'Select a date.'
  const selected = new Date(`${value}T00:00:00`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return selected >= today ? true : 'Choose today or a future date.'
}

export function validateFile(file, { requiredFile = false } = {}) {
  if (!file) return requiredFile ? 'Upload a PDF, JPG, or PNG file.' : true
  if (!ACCEPTED_FILE_TYPES.includes(file.type)) return 'Upload a PDF, JPG, or PNG file.'
  if (file.size > MAX_UPLOAD_BYTES) return 'File must be 5 MB or smaller.'
  return true
}
