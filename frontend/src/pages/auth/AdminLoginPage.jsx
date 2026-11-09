import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { FormInput, PasswordInput } from '../../components/common/FormInput'
import Button from '../../components/common/Button'
import { email, required } from '../../utils/validators'
import { applyFieldErrors, getErrorMessage } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'

export default function AdminLoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [formError, setFormError] = useState('')
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm()

  if (user?.role === 'admin') return <Navigate to="/admin" replace />
  if (user) return <Navigate to={user.role === 'lawyer' ? '/lawyer' : '/client'} replace />

  const submit = async (values) => {
    setFormError('')
    try {
      await login({ email: values.email.trim(), password: values.password }, { expectedRole: 'admin' })
      navigate('/admin', { replace: true })
    } catch (error) {
      applyFieldErrors(error, setError)
      setFormError(getErrorMessage(error))
    }
  }

  return (
    <AuthLayout title="Admin sign in" subtitle="This entrance is only for administrator accounts. It does not create an admin user.">
      <form className="space-y-4" onSubmit={handleSubmit(submit)} noValidate>
        {formError && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">{formError}</p>}
        <FormInput label="Email" type="email" required autoComplete="username" registration={register('email', { validate: email })} error={errors.email?.message} />
        <PasswordInput label="Password" required autoComplete="current-password" registration={register('password', { validate: required })} error={errors.password?.message} />
        <Button type="submit" className="w-full" loading={isSubmitting}>Enter admin dashboard</Button>
      </form>
      <p className="mt-4 text-sm text-muted">
        <Link className="font-semibold text-sea-700" to="/login">Client and lawyer login</Link>
      </p>
    </AuthLayout>
  )
}
