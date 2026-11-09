import { Link, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { PasswordInput } from '../../components/common/FormInput'
import Button from '../../components/common/Button'
import { match, password } from '../../utils/validators'
import { applyFieldErrors, getErrorMessage } from '../../services/api'
import * as authService from '../../services/authService'

export default function ResetPasswordPage() {
  const [params] = useSearchParams()
  const token = params.get('token') || ''
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState('')
  const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting } } = useForm()
  const chosen = watch('password')

  const submit = async (values) => {
    setFormError('')
    try {
      const result = await authService.resetPassword({ token, password: values.password })
      setSuccess(result?.message || 'Password reset. You can now sign in.')
    } catch (error) {
      applyFieldErrors(error, setError)
      setFormError(getErrorMessage(error))
    }
  }

  return (
    <AuthLayout title="Reset password" subtitle="Choose a new password for your account.">
      {!token ? (
        <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">
          This reset link is missing a token. Request a new link from the forgot password page.
        </p>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit(submit)} noValidate>
          {formError && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">{formError}</p>}
          {success && <p className="rounded-xl bg-sea-100 px-3 py-2 text-sm text-navy-900" role="status">{success}</p>}
          <PasswordInput label="New password" required autoComplete="new-password" registration={register('password', { validate: password })} error={errors.password?.message} />
          <PasswordInput label="Confirm password" required autoComplete="new-password" registration={register('confirmPassword', { validate: match(chosen || '') })} error={errors.confirmPassword?.message} />
          <Button type="submit" className="w-full" loading={isSubmitting} disabled={Boolean(success)}>Reset password</Button>
        </form>
      )}
      <p className="mt-4 text-sm text-muted">
        <Link className="font-semibold text-sea-700" to="/login">Return to login</Link>
      </p>
    </AuthLayout>
  )
}
