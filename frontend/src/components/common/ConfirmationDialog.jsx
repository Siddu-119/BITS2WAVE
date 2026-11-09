import Button from './Button'
import Modal from './Modal'

export default function ConfirmationDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  tone = 'primary',
  loading = false,
  onConfirm,
  onClose,
  children,
  confirmDisabled = false,
}) {
  return (
    <Modal open={open} title={title} onClose={loading ? () => {} : onClose}>
      <p className="text-sm leading-6 text-muted">{message}</p>
      {children && <div className="mt-4">{children}</div>}
      <div className="mt-6 flex flex-wrap justify-end gap-2">
        <Button variant="secondary" onClick={onClose} disabled={loading}>Cancel</Button>
        <Button variant={tone === 'danger' ? 'danger' : 'primary'} onClick={onConfirm} loading={loading} disabled={confirmDisabled}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
