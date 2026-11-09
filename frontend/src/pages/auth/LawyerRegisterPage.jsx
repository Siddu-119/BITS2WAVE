import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { FilePicker, FormInput, FormSelect, FormTextarea, PasswordInput } from '../../components/common/FormInput'
import Button from '../../components/common/Button'
import { DISTRICTS, homeByRole, SPECIALIZATIONS } from '../../utils/constants'
import { email, match, minLength, nonNegativeNumber, password, phone, required, validateFile } from '../../utils/validators'
import { applyFieldErrors, getErrorMessage } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'

export default function LawyerRegisterPage() {
  const { user, register: registerAccount, establish } = useAuth()
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [fileError, setFileError] = useState('')
  const [formError, setFormError] = useState('')
  const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting } } = useForm({ defaultValues: { specialization: '' } })
  const chosenPassword = watch('password')
  if (user) return <Navigate to={homeByRole[user.role] || '/'} replace />

  const submit = async (values) => {
    const fileCheck = validateFile(file, { requiredFile: true })
    if (fileCheck !== true) {
      setFileError(fileCheck)
      return
    }
    setFormError('')
    const form = new FormData()
    form.append('role', 'lawyer')
    form.append('fullName', values.fullName.trim())
    form.append('email', values.email.trim())
    form.append('phone', values.phone.trim())
    form.append('password', values.password)
    form.append('barCouncilNumber', values.barCouncilNumber.trim())
    form.append('specialization', values.specialization)
    form.append('experience', String(values.experience))
    form.append('location', values.location.trim())
    form.append('qualifications', values.qualifications.trim())
    form.append('document', file)
    try {
      const payload = await registerAccount(form)
      try {
        const account = establish(payload)
        navigate(homeByRole[account.role] || '/lawyer', { replace: true })
      } catch {
        navigate('/login?registered=lawyer', { replace: true })
      }
    } catch (error) {
      applyFieldErrors(error, setError)
      setFormError(getErrorMessage(error))
    }
  }

  return (
    <AuthLayout title="Lawyer registration" subtitle="Your profile stays pending until an administrator verifies the registration and document.">
      <form className="space-y-4" onSubmit={handleSubmit(submit)} noValidate>
        {formError && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">{formError}</p>}
        <FormInput label="Full name" required registration={register('fullName', { validate: minLength(2) })} error={errors.fullName?.message} />
        <FormInput label="Email" type="email" required autoComplete="email" registration={register('email', { validate: email })} error={errors.email?.message} />
        <FormInput label="Phone number" required inputMode="tel" registration={register('phone', { validate: phone })} error={errors.phone?.message} />
        <PasswordInput label="Password" required autoComplete="new-password" registration={register('password', { validate: password })} error={errors.password?.message} />
        <PasswordInput label="Confirm password" required autoComplete="new-password" registration={register('confirmPassword', { validate: match(chosenPassword || '') })} error={errors.confirmPassword?.message} />
        <FormInput label="Bar Council registration number" required registration={register('barCouncilNumber', { validate: minLength(3) })} error={errors.barCouncilNumber?.message} />
        <FormSelect label="Specialization" required registration={register('specialization', { validate: required })} error={errors.specialization?.message}>
          <option value="">Select a specialization</option>
          {SPECIALIZATIONS.map((item) => <option key={item}>{item}</option>)}
        </FormSelect>
        <FormInput label="Experience in years" type="number" min="0" max="80" required registration={register('experience', { validate: nonNegativeNumber })} error={errors.experience?.message} />
        <FormInput label="Location" required list="lawyer-districts" registration={register('location', { validate: required })} error={errors.location?.message} />
        <datalist id="lawyer-districts">{DISTRICTS.map((district) => <option key={district} value={district} />)}</datalist>
        <FormTextarea label="Qualifications" required registration={register('qualifications', { validate: required })} error={errors.qualifications?.message} />
        <FilePicker label="Verification document" required file={file} error={fileError} onChange={(next) => { setFile(next); setFileError('') }} />
        <Button type="submit" className="w-full" loading={isSubmitting}>Submit lawyer registration</Button>
      </form>
      <p className="mt-4 text-sm text-muted">
        Need a client account? <Link className="font-semibold text-sea-700" to="/register/client">Client registration</Link>
      </p>
    </AuthLayout>
  )
}
