import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import SectionHeading from '../../components/common/SectionHeading'
import { FormInput, FormTextarea } from '../../components/common/FormInput'
import Button from '../../components/common/Button'
import { contactInfo } from '../../utils/constants'
import { email, maxLength, minLength, required } from '../../utils/validators'
import { applyFieldErrors, getErrorMessage } from '../../services/api'
import * as userService from '../../services/userService'

const details = [
  [Mail, 'Email', contactInfo.email],
  [Phone, 'Phone', contactInfo.phone],
  [MapPin, 'Address', contactInfo.address],
].filter(([, , value]) => value)

export default function ContactPage() {
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState('')
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm()

  const submit = async (values) => {
    setFormError('')
    setSuccess('')
    try {
      const result = await userService.sendContact({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      })
      setSuccess(result?.message || 'Your message was sent.')
      reset()
    } catch (error) {
      applyFieldErrors(error, setError)
      setFormError(getErrorMessage(error))
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:px-6">
      <div>
        <SectionHeading eyebrow="Contact" title="Write to the platform" description="Use this form for questions about the marketplace. It is not a channel for emergency legal advice." />
        <ul className="mt-8 space-y-4">
          {details.length === 0 && <li className="text-sm text-muted">Public contact details have not been configured yet.</li>}
          {details.map(([Icon, label, value]) => (
            <li key={label} className="flex gap-3 text-sm text-ink">
              <Icon className="mt-0.5 text-sea-700" size={18} />
              <span><span className="block text-muted">{label}</span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
      <form className="space-y-4 rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6" onSubmit={handleSubmit(submit)} noValidate>
        {formError && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">{formError}</p>}
        {success && <p className="rounded-xl bg-sea-100 px-3 py-2 text-sm text-navy-900" role="status">{success}</p>}
        <FormInput label="Name" required registration={register('name', { validate: minLength(2) })} error={errors.name?.message} />
        <FormInput label="Email" type="email" required registration={register('email', { validate: email })} error={errors.email?.message} />
        <FormInput label="Subject" required registration={register('subject', { validate: required })} error={errors.subject?.message} />
        <FormTextarea label="Message" required registration={register('message', { validate: (value) => minLength(10)(value) === true ? maxLength(1000)(value) : minLength(10)(value) })} error={errors.message?.message} />
        <Button type="submit" loading={isSubmitting}>Send message</Button>
      </form>
    </div>
  )
}
