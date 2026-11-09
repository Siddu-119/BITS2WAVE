import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import Notification from '../components/common/Notification'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [items, setItems] = useState([])

  const dismiss = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const notify = useCallback((message, type = 'info') => {
    const id = crypto.randomUUID()
    setItems((current) => [...current, { id, message, type }])
    window.setTimeout(() => dismiss(id), 4800)
  }, [dismiss])

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[70] flex w-[min(100%-2rem,24rem)] flex-col gap-2">
        {items.map((item) => (
          <Notification key={item.id} item={item} onDismiss={dismiss} />
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('Notifications are unavailable outside NotificationProvider.')
  return context
}
