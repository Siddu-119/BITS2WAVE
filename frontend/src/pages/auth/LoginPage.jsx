import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { FormInput, PasswordInput } from '../../components/common/FormInput'
import Button from '../../components/common/Button'
import { email, required } from '../../utils/validators'
import { applyFieldErrors, getErrorMessage } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'
import { safeNext } from '../../utils/format'

export default function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [formError, setFormError] = useState('')
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm()

  if (user) return <Navigate to={safeNext(params.get('next'), user.role)} replace />

  const submit = async (values) => {
    setFormError('')
    try {
      const account = await login({ email: values.email.trim(), password: values.password })
      navigate(safeNext(params.get('next'), account.role), { replace: true })
    } catch (error) {
      applyFieldErrors(error, setError)
      setFormError(getErrorMessage(error))
    }
  }

  const registered = params.get('registered')

  return (
    <AuthLayout title="Sign in" subtitle="Clients and lawyers use this page. Administrators have a separate entrance.">
      {registered && (
        <p className="mb-4 rounded-xl bg-sea-100 px-3 py-2 text-sm text-navy-900" role="status">
          Registration was submitted. Sign in after your account is ready.
        </p>
      )}
      <form className="space-y-4" onSubmit={handleSubmit(submit)} noValidate>
        {formError && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">{formError}</p>}
        <FormInput label="Email" type="email" required autoComplete="email" registration={register('email', { validate: email })} error={errors.email?.message} />
        <PasswordInput label="Password" required autoComplete="current-password" registration={register('password', { validate: required })} error={errors.password?.message} />
        <div className="text-right">
          <Link className="text-sm font-semibold text-sea-700" to="/forgot-password">Forgot password?</Link>
        </div>
        <Button type="submit" className="w-full" loading={isSubmitting}>Login</Button>
      </form>
      <p className="mt-4 text-sm text-muted">
        New here? <Link className="font-semibold text-sea-700" to="/register">Create an account</Link>
      </p>
      <p className="mt-2 text-sm text-muted">
        <Link className="font-semibold text-sea-700" to="/admin/login">Admin login</Link>
      </p>
    </AuthLayout>
  )
}
