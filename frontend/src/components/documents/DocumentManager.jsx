import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as documentService from '../../services/documentService'
import { useResource } from '../../hooks/useResource'
import { applyFieldErrors, getErrorMessage } from '../../services/api'
import { required, validateFile } from '../../utils/validators'
import { formatDate } from '../../utils/format'
import Button from '../common/Button'
import { FilePicker, FormInput, FormSelect } from '../common/FormInput'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorMessage from '../common/ErrorMessage'
import EmptyState from '../common/EmptyState'
import StatusBadge from '../common/StatusBadge'
import DataTable from '../dashboard/DataTable'
import { useNotification } from '../../context/NotificationContext'

export default function DocumentManager({ categories, description }) {
  const { notify } = useNotification()
  const { data, loading, error, reload } = useResource(() => documentService.list(), [])
  const [file, setFile] = useState(null)
  const [fileError, setFileError] = useState('')
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { title: '', category: categories[0] || '' },
  })

  const submit = async (values) => {
    const fileCheck = validateFile(file, { requiredFile: true })
    if (fileCheck !== true) {
      setFileError(fileCheck)
      return
    }
    setFileError('')
    try {
      const result = await documentService.upload({ title: values.title.trim(), category: values.category }, file)
      notify(result?.message || 'Document uploaded.', 'success')
      reset()
      setFile(null)
      reload()
    } catch (uploadError) {
      applyFieldErrors(uploadError, setError)
      notify(getErrorMessage(uploadError), 'error')
    }
  }

  const download = async (document) => {
    try {
      if (document.url) {
        window.open(document.url, '_blank', 'noopener,noreferrer')
        return
      }
      await documentService.download(document.id, document.title)
    } catch (downloadError) {
      notify(getErrorMessage(downloadError), 'error')
    }
  }

  const items = data?.items || []

  return (
    <div className="space-y-6">
      <p className="text-sm leading-6 text-muted">{description}</p>
      <form className="grid gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm md:grid-cols-2" onSubmit={handleSubmit(submit)} noValidate>
        <FormInput label="Document title" required registration={register('title', { validate: required })} error={errors.title?.message} />
        <FormSelect label="Category" required registration={register('category', { validate: required })} error={errors.category?.message}>
          {categories.map((category) => <option key={category}>{category}</option>)}
        </FormSelect>
        <div className="md:col-span-2">
          <FilePicker label="File" required file={file} error={fileError} onChange={(next) => { setFile(next); setFileError('') }} />
        </div>
        <div>
          <Button type="submit" loading={isSubmitting}>Upload document</Button>
        </div>
      </form>
      {loading && !data ? <LoadingSpinner label="Loading documents" /> : null}
      {error && !data ? <ErrorMessage message={getErrorMessage(error)} onRetry={reload} /> : null}
      {data && (
        items.length === 0 ? (
          <EmptyState title="No documents yet" description="Uploaded files and their verification status will appear here." />
        ) : (
          <DataTable
            rows={items}
            getRowId={(row) => row.id || row.title}
            emptyTitle="No documents yet"
            columns={[
              { key: 'title', header: 'Document', render: (row) => row.title },
              { key: 'category', header: 'Category', render: (row) => row.category || '—' },
              { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
              { key: 'date', header: 'Uploaded', render: (row) => formatDate(row.createdAt) },
              {
                key: 'action',
                header: 'File',
                render: (row) => row.id || row.url ? (
                  <button type="button" className="font-semibold text-sea-700" onClick={() => download(row)}>Download</button>
                ) : '—',
              },
            ]}
          />
        )
      )}
    </div>
  )
}
