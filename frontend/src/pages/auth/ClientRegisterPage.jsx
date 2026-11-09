import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { FormInput, PasswordInput } from '../../components/common/FormInput'
import Button from '../../components/common/Button'
import { DISTRICTS, homeByRole } from '../../utils/constants'
import { email, match, minLength, password, phone, required } from '../../utils/validators'
import { applyFieldErrors, getErrorMessage } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'

export default function ClientRegisterPage() {
  const { user, register: registerAccount, establish } = useAuth()
  const navigate = useNavigate()
  const [formError, setFormError] = useState('')
  const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting } } = useForm()
  const chosenPassword = watch('password')
  if (user) return <Navigate to={homeByRole[user.role] || '/'} replace />

  const submit = async (values) => {
    setFormError('')
    try {
      const payload = await registerAccount({
        role: 'client',
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        password: values.password,
        location: values.location.trim(),
      })
      try {
        const account = establish(payload)
        navigate(homeByRole[account.role] || '/client', { replace: true })
      } catch {
        navigate('/login?registered=client', { replace: true })
      }
    } catch (error) {
      applyFieldErrors(error, setError)
      setFormError(getErrorMessage(error))
    }
  }

  return (
    <AuthLayout title="Client registration" subtitle="Use the details you want lawyers and the platform to see.">
      <form className="space-y-4" onSubmit={handleSubmit(submit)} noValidate>
        {formError && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">{formError}</p>}
        <FormInput label="Full name" required registration={register('fullName', { validate: minLength(2) })} error={errors.fullName?.message} />
        <FormInput label="Email" type="email" required autoComplete="email" registration={register('email', { validate: email })} error={errors.email?.message} />
        <FormInput label="Phone number" required inputMode="tel" registration={register('phone', { validate: phone })} error={errors.phone?.message} />
        <FormInput label="Location" required list="client-districts" registration={register('location', { validate: required })} error={errors.location?.message} />
        <datalist id="client-districts">{DISTRICTS.map((district) => <option key={district} value={district} />)}</datalist>
        <PasswordInput label="Password" required autoComplete="new-password" registration={register('password', { validate: password })} error={errors.password?.message} />
        <PasswordInput label="Confirm password" required autoComplete="new-password" registration={register('confirmPassword', { validate: match(chosenPassword || '') })} error={errors.confirmPassword?.message} />
        <Button type="submit" className="w-full" loading={isSubmitting}>Create client account</Button>
      </form>
      <p className="mt-4 text-sm text-muted">
        Registering as a lawyer? <Link className="font-semibold text-sea-700" to="/register/lawyer">Lawyer registration</Link>
      </p>
    </AuthLayout>
  )
}
