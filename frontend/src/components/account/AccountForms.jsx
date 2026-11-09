import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { FormInput, PasswordInput } from '../common/FormInput'
import Button from '../common/Button'
import { match, minLength, password, phone, required } from '../../utils/validators'
import { applyFieldErrors, getErrorMessage } from '../../services/api'
import * as authService from '../../services/authService'
import { useNotification } from '../../context/NotificationContext'
import { DISTRICTS } from '../../utils/constants'

export function ProfileDetailsForm({ initial, email, includeLocation = true, onSubmit }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: initial?.name || '',
      phone: initial?.phone || '',
      location: initial?.location || '',
    },
  })
  const [formError, setFormError] = useState('')

  const submit = async (values) => {
    setFormError('')
    try {
      await onSubmit({
        fullName: values.name.trim(),
        phone: values.phone.trim(),
        location: includeLocation ? values.location.trim() : undefined,
      })
    } catch (error) {
      applyFieldErrors(error, () => {})
      setFormError(getErrorMessage(error))
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(submit)} noValidate>
      {formError && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">{formError}</p>}
      <FormInput label="Full name" required registration={register('name', { validate: minLength(2) })} error={errors.name?.message} />
      <FormInput label="Email" value={email || ''} readOnly />
      <p className="-mt-2 text-xs text-muted">Email is managed through the authentication service and is shown here for reference.</p>
      <FormInput label="Phone number" required registration={register('phone', { validate: phone })} error={errors.phone?.message} inputMode="tel" />
      {includeLocation && (
        <>
          <FormInput label="Location" required registration={register('location', { validate: required })} error={errors.location?.message} list="profile-districts" />
          <datalist id="profile-districts">
            {DISTRICTS.map((district) => <option key={district} value={district} />)}
          </datalist>
        </>
      )}
      <Button type="submit" loading={isSubmitting}>Save profile</Button>
    </form>
  )
}

export function PasswordChangeForm() {
  const { notify } = useNotification()
  const { register, handleSubmit, watch, reset, setError, formState: { errors, isSubmitting } } = useForm()
  const [formError, setFormError] = useState('')
  const nextPassword = watch('newPassword')

  const submit = async (values) => {
    setFormError('')
    try {
      const result = await authService.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
      reset()
      notify(result?.message || 'Password updated.', 'success')
    } catch (error) {
      applyFieldErrors(error, setError)
      setFormError(getErrorMessage(error))
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(submit)} noValidate>
      {formError && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">{formError}</p>}
      <PasswordInput label="Current password" required autoComplete="current-password" registration={register('currentPassword', { validate: required })} error={errors.currentPassword?.message} />
      <PasswordInput label="New password" required autoComplete="new-password" registration={register('newPassword', { validate: password })} error={errors.newPassword?.message} />
      <PasswordInput label="Confirm new password" required autoComplete="new-password" registration={register('confirmPassword', { validate: match(nextPassword || '') })} error={errors.confirmPassword?.message} />
      <Button type="submit" loading={isSubmitting}>Change password</Button>
    </form>
  )
}
