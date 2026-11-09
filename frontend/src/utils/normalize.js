const ROLE_ALIASES = {
  client: 'client',
  user: 'client',
  customer: 'client',
  normal: 'client',
  lawyer: 'lawyer',
  advocate: 'lawyer',
  admin: 'admin',
  administrator: 'admin',
}

export function normalizeRole(role) {
  return ROLE_ALIASES[String(role || '').toLowerCase()] || ''
}

export function unwrapData(payload) {
  if (payload && typeof payload === 'object' && payload.data && !Array.isArray(payload.data)) {
    return payload.data
  }
  return payload
}

export function unwrapList(payload) {
  if (Array.isArray(payload)) return { items: payload, meta: null }
  if (!payload || typeof payload !== 'object') return { items: [], meta: null }
  const keys = ['data', 'items', 'results', 'lawyers', 'users', 'appointments', 'documents', 'enquiries', 'messages', 'testimonials']
  for (const key of keys) {
    if (Array.isArray(payload[key])) {
      return { items: payload[key], meta: payload.meta || payload.pagination || null }
    }
  }
  return { items: [], meta: null }
}

export function normalizeUser(raw) {
  const user = raw?.user || raw
  if (!user || typeof user !== 'object' || Array.isArray(user)) return null
  const role = normalizeRole(user.role || user.userType || user.accountType)
  if (!role) return null
  return {
    id: user.id || user._id || '',
    name: user.fullName || user.name || '',
    email: user.email || '',
    phone: user.phone || user.phoneNumber || '',
    role,
    location: user.location || '',
    verificationStatus: user.verificationStatus || user.lawyerStatus || '',
  }
}

export function normalizeLawyer(raw) {
  if (!raw || typeof raw !== 'object') return null
  const lawyer = raw.lawyer || raw
  const consultation = lawyer.consultation || {}
  return {
    id: lawyer.id || lawyer._id || '',
    name: lawyer.fullName || lawyer.name || '',
    email: lawyer.email || '',
    phone: lawyer.phone || lawyer.phoneNumber || '',
    specialization: lawyer.specialization || lawyer.practiceArea || '',
    experience: lawyer.experience ?? lawyer.yearsOfExperience ?? '',
    location: lawyer.location || lawyer.city || lawyer.district || '',
    qualifications: lawyer.qualifications || '',
    description: lawyer.description || lawyer.bio || '',
    verificationStatus: String(lawyer.verificationStatus || lawyer.status || 'pending').toLowerCase(),
    barCouncilNumber: lawyer.barCouncilNumber || lawyer.barCouncilRegistrationNumber || '',
    photoUrl: lawyer.photoUrl || lawyer.profilePhoto || lawyer.avatar || '',
    rejectionReason: lawyer.rejectionReason || '',
    documents: Array.isArray(lawyer.documents) ? lawyer.documents.map(normalizeDocument) : [],
    consultation: {
      fee: consultation.fee ?? lawyer.consultationFee ?? '',
      mode: consultation.mode ?? lawyer.consultationMode ?? '',
      duration: consultation.duration ?? lawyer.consultationDuration ?? '',
      details: consultation.details ?? lawyer.consultationDetails ?? '',
    },
  }
}

export function normalizeAppointment(raw) {
  if (!raw || typeof raw !== 'object') return null
  const item = raw.appointment || raw
  return {
    id: item.id || item._id || '',
    lawyerId: item.lawyerId || item.lawyer?.id || item.lawyer?._id || '',
    clientId: item.clientId || item.client?.id || item.client?._id || '',
    lawyerName: item.lawyerName || item.lawyer?.fullName || item.lawyer?.name || '',
    clientName: item.clientName || item.client?.fullName || item.client?.name || '',
    date: item.date || item.appointmentDate || '',
    time: item.time || item.appointmentTime || '',
    status: String(item.status || 'pending').toLowerCase(),
    notes: item.notes || item.reason || '',
    rejectionReason: item.rejectionReason || item.reasonForRejection || '',
    createdAt: item.createdAt || item.created_at || '',
  }
}

export function normalizeDocument(raw) {
  if (!raw || typeof raw !== 'object') return null
  return {
    id: raw.id || raw._id || '',
    title: raw.title || raw.name || raw.fileName || 'Document',
    category: raw.category || raw.type || '',
    status: String(raw.status || raw.verificationStatus || 'pending').toLowerCase(),
    createdAt: raw.createdAt || raw.uploadedAt || '',
    url: raw.url || raw.fileUrl || '',
    owner: raw.ownerName || raw.user?.name || raw.lawyer?.name || raw.uploadedBy || '',
    note: raw.verificationNote || raw.rejectionReason || raw.note || '',
  }
}

export function normalizeEnquiry(raw) {
  if (!raw || typeof raw !== 'object') return null
  const responses = Array.isArray(raw.responses)
    ? raw.responses
    : raw.reply
      ? [{ message: raw.reply, createdAt: raw.repliedAt || '' }]
      : []
  return {
    id: raw.id || raw._id || '',
    subject: raw.subject || 'Enquiry',
    message: raw.message || raw.details || '',
    status: String(raw.status || 'open').toLowerCase(),
    clientName: raw.clientName || raw.client?.name || raw.client?.fullName || '',
    email: raw.email || raw.client?.email || '',
    createdAt: raw.createdAt || '',
    responses: responses.map((response, index) => ({
      id: response.id || `${index}`,
      message: response.message || response.text || '',
      createdAt: response.createdAt || '',
      author: response.author || response.sender || 'Lawyer',
    })),
  }
}

function numberOrNull(value) {
  if (value === 0 || value === '0') return 0
  if (value === undefined || value === null || value === '') return null
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

export function normalizeDashboard(raw) {
  const data = raw?.data && !Array.isArray(raw.data) ? raw.data : raw || {}
  return {
    totalUsers: numberOrNull(data.totalUsers ?? data.usersCount),
    totalLawyers: numberOrNull(data.totalLawyers ?? data.lawyersCount),
    verifiedLawyers: numberOrNull(data.verifiedLawyers),
    pendingApplications: numberOrNull(data.pendingApplications ?? data.pendingLawyers),
    rejectedApplications: numberOrNull(data.rejectedApplications ?? data.rejectedLawyers),
    totalAppointments: numberOrNull(data.totalAppointments ?? data.appointmentsCount),
    recentRegistrations: Array.isArray(data.recentRegistrations) ? data.recentRegistrations : [],
    recentActivities: Array.isArray(data.recentActivities) ? data.recentActivities : [],
    userStats: data.userStats || null,
    lawyerStats: data.lawyerStats || null,
    appointmentStats: data.appointmentStats || null,
    verificationStats: data.verificationStats || null,
  }
}

export function readAuthPayload(payload) {
  const body = payload?.token || payload?.accessToken ? payload : payload?.data || payload
  return {
    token: body?.token || body?.accessToken || '',
    user: normalizeUser(body?.user || body?.account || body),
    message: body?.message || payload?.message || '',
  }
}

export function extractReply(payload) {
  const nested = payload?.data && typeof payload.data === 'object' ? payload.data : null
  const body = nested ? { ...payload, ...nested } : payload || {}
  const reply = body.reply || body.answer || body.response || ''
  const text = typeof reply === 'string' ? reply.trim() : ''
  const sources = body.sources || body.references || body.citations || []
  return {
    reply: text,
    sources: Array.isArray(sources)
      ? sources.map((source) => {
          if (typeof source === 'string') return { title: source, url: '' }
          return {
            title: source.title || source.name || source.label || 'Source',
            url: source.url || source.link || '',
          }
        })
      : [],
  }
}

export function emptyAvailability(days) {
  return days.map(([day, label]) => ({ day, label, enabled: false, slots: [] }))
}

export function normalizeAvailability(payload, days) {
  const base = emptyAvailability(days)
  const source = payload?.availability || payload?.days || payload?.data?.availability || payload?.data || payload
  if (!source) return base
  const readDay = (day) => {
    if (Array.isArray(source)) {
      return source.find((item) => String(item.day || item.name || '').toLowerCase() === day)
    }
    if (source && typeof source === 'object') return source[day]
    return null
  }
  return base.map((day) => {
    const found = readDay(day.day)
    if (!found) return day
    const slots = Array.isArray(found) ? found : found.slots || found.times || []
    const enabled = Array.isArray(found) ? slots.length > 0 : Boolean(found.enabled ?? slots.length)
    return { ...day, enabled, slots: slots.map(String) }
  })
}

export function toChartSeries(stats) {
  if (!stats) return []
  if (Array.isArray(stats)) {
    return stats
      .map((item) => ({
        label: item.label || item.name || '',
        value: Number(item.value ?? item.count),
      }))
      .filter((item) => item.label && Number.isFinite(item.value))
  }
  if (typeof stats === 'object') {
    return Object.entries(stats)
      .filter(([, value]) => Number.isFinite(Number(value)) && typeof value !== 'object')
      .map(([label, value]) => ({ label, value: Number(value) }))
  }
  return []
}
