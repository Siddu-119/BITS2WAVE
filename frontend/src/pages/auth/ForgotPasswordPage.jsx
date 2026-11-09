import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { FormInput } from '../../components/common/FormInput'
import Button from '../../components/common/Button'
import { email } from '../../utils/validators'
import { applyFieldErrors, getErrorMessage } from '../../services/api'
import * as authService from '../../services/authService'

export default function ForgotPasswordPage() {
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState('')
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm()

  const submit = async (values) => {
    setFormError('')
    setSuccess('')
    try {
      const result = await authService.forgotPassword({ email: values.email.trim() })
      setSuccess(result?.message || 'If an account exists for that email, the server will send reset instructions.')
    } catch (error) {
      applyFieldErrors(error, setError)
      setFormError(getErrorMessage(error))
    }
  }

  return (
    <AuthLayout title="Forgot password" subtitle="Enter the email on your account. Reset instructions are sent by the authentication service.">
      <form className="space-y-4" onSubmit={handleSubmit(submit)} noValidate>
        {formError && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">{formError}</p>}
        {success && <p className="rounded-xl bg-sea-100 px-3 py-2 text-sm text-navy-900" role="status">{success}</p>}
        <FormInput label="Email" type="email" required autoComplete="email" registration={register('email', { validate: email })} error={errors.email?.message} />
        <Button type="submit" className="w-full" loading={isSubmitting}>Send reset link</Button>
      </form>
      <p className="mt-4 text-sm text-muted">
        <Link className="font-semibold text-sea-700" to="/login">Return to login</Link>
      </p>
    </AuthLayout>
  )
}
