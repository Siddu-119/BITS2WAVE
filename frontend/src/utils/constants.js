export const PLATFORM = {
  name: 'Regional LegalTech',
  descriptor: 'Marketplace',
  fullName: 'Regional LegalTech Marketplace',
}

export const ROLES = {
  client: 'client',
  lawyer: 'lawyer',
  admin: 'admin',
}

export const homeByRole = {
  client: '/client',
  lawyer: '/lawyer',
  admin: '/admin',
}

export const SPECIALIZATIONS = [
  'Civil Law',
  'Criminal Law',
  'Family Law',
  'Property Law',
  'Labour Law',
  'Consumer Law',
  'Corporate Law',
  'Constitutional Law',
  'Tax Law',
  'Other',
]

export const DISTRICTS = [
  'Bagalkot',
  'Ballari',
  'Belagavi',
  'Bengaluru Rural',
  'Bengaluru Urban',
  'Bidar',
  'Chamarajanagar',
  'Chikkaballapur',
  'Chikkamagaluru',
  'Chitradurga',
  'Dakshina Kannada',
  'Davanagere',
  'Dharwad',
  'Gadag',
  'Hassan',
  'Haveri',
  'Kalaburagi',
  'Kodagu',
  'Kolar',
  'Koppal',
  'Mandya',
  'Mysuru',
  'Raichur',
  'Ramanagara',
  'Shivamogga',
  'Tumakuru',
  'Udupi',
  'Uttara Kannada',
  'Vijayanagara',
  'Vijayapura',
  'Yadgir',
  'Other',
]

export const EXPERIENCE_FILTERS = [
  { value: '0-2', label: '0–2 years' },
  { value: '3-5', label: '3–5 years' },
  { value: '6-10', label: '6–10 years' },
  { value: '10+', label: '10+ years' },
]

export const CONSULTATION_MODES = ['In person', 'Phone', 'Video']

export const DAYS = [
  ['monday', 'Monday'],
  ['tuesday', 'Tuesday'],
  ['wednesday', 'Wednesday'],
  ['thursday', 'Thursday'],
  ['friday', 'Friday'],
  ['saturday', 'Saturday'],
  ['sunday', 'Sunday'],
]

export const TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
]

export const APPOINTMENT_STATUSES = ['pending', 'accepted', 'rejected', 'completed', 'cancelled']

export const DISCLAIMER =
  'This AI assistant provides general legal information and is not a substitute for advice from a qualified lawyer.'

export const DISCLAIMER_KN =
  'ಈ AI ಸಹಾಯಕವು ಸಾಮಾನ್ಯ ಕಾನೂನು ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸುತ್ತದೆ. ಇದು ಅರ್ಹ ವಕೀಲರ ಸಲಹೆಗೆ ಬದಲಾಗುವುದಿಲ್ಲ.'

export const ASSISTANT_COPY = {
  en: {
    language: 'Language',
    title: 'AI Legal Assistant',
    intro: 'Ask a general question about legal process, documents, or how to find a lawyer.',
    placeholder: 'Type your question',
    send: 'Send',
    clear: 'Clear conversation',
    suggested: 'Suggested questions',
    sources: 'Sources and references',
    empty: 'Ask a question to begin. Answers come from the server.',
    prompts: [
      'What documents are needed to register a property?',
      'How can I respond to a legal notice?',
      'What is the process for filing a consumer complaint?',
      'How do I find a family lawyer near me?',
    ],
  },
  kn: {
    language: 'ಭಾಷೆ',
    title: 'AI ಕಾನೂನು ಸಹಾಯಕ',
    intro: 'ಕಾನೂನು ಪ್ರಕ್ರಿಯೆ, ದಾಖಲೆಗಳು ಅಥವಾ ವಕೀಲರನ್ನು ಹುಡುಕುವ ಬಗ್ಗೆ ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ.',
    placeholder: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಬರೆಯಿರಿ',
    send: 'ಕಳುಹಿಸಿ',
    clear: 'ಸಂಭಾಷಣೆ ಅಳಿಸಿ',
    suggested: 'ಸೂಚಿಸಿದ ಪ್ರಶ್ನೆಗಳು',
    sources: 'ಆಧಾರಗಳು',
    empty: 'ಪ್ರಾರಂಭಿಸಲು ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ. ಉತ್ತರಗಳು ಸರ್ವರ್‌ನಿಂದ ಬರುತ್ತವೆ.',
    prompts: [
      'ಆಸ್ತಿ ನೋಂದಣಿಗೆ ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು?',
      'ಕಾನೂನು ನೋಟಿಸ್‌ಗೆ ಹೇಗೆ ಪ್ರತಿಕ್ರಿಯಿಸಬಹುದು?',
      'ಗ್ರಾಹಕ ದೂರು ಸಲ್ಲಿಸುವ ವಿಧಾನವೇನು?',
      'ನನ್ನ ಹತ್ತಿರ ಕುಟುಂಬ ವಕೀಲರನ್ನು ಹೇಗೆ ಹುಡುಕುವುದು?',
    ],
  },
}

export const contactInfo = {
  email: import.meta.env.VITE_CONTACT_EMAIL || '',
  phone: import.meta.env.VITE_CONTACT_PHONE || '',
  address: import.meta.env.VITE_CONTACT_ADDRESS || '',
}

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024

export const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png']
