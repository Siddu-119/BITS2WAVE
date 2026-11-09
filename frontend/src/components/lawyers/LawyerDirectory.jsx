import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DISTRICTS, EXPERIENCE_FILTERS, SPECIALIZATIONS } from '../../utils/constants'
import { useResource } from '../../hooks/useResource'
import * as lawyerService from '../../services/lawyerService'
import { getErrorMessage } from '../../services/api'
import LawyerCard from '../common/LawyerCard'
import SearchBar from '../common/SearchBar'
import FilterPanel from '../common/FilterPanel'
import { fieldClass } from '../common/FormInput'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorMessage from '../common/ErrorMessage'
import EmptyState from '../common/EmptyState'

export default function LawyerDirectory({ getProfilePath }) {
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState(params.get('search') || '')
  const [location, setLocation] = useState(params.get('location') || '')
  const [specialization, setSpecialization] = useState(params.get('specialization') || '')
  const [experience, setExperience] = useState(params.get('experience') || '')

  const queryKey = params.toString()
  const { data, loading, error, reload } = useResource(
    () => lawyerService.list({
      search: params.get('search') || undefined,
      location: params.get('location') || undefined,
      specialization: params.get('specialization') || undefined,
      experience: params.get('experience') || undefined,
    }),
    [queryKey],
  )

  const apply = (event) => {
    event?.preventDefault()
    const next = Object.fromEntries(
      Object.entries({ search: search.trim(), location, specialization, experience }).filter(([, value]) => value),
    )
    setParams(next)
  }

  const reset = () => {
    setSearch('')
    setLocation('')
    setSpecialization('')
    setExperience('')
    setParams({})
  }

  const items = data?.items || []
  const total = data?.meta?.total

  return (
    <div className="space-y-5">
      <form onSubmit={apply} className="space-y-4">
        <SearchBar id="lawyer-search" value={search} onChange={setSearch} placeholder="Search by lawyer name" />
        <FilterPanel onReset={reset}>
          <label className="block text-sm">
            <span className="mb-1.5 block font-semibold text-navy-900">Location</span>
            <input className={fieldClass} list="districts" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="District or town" />
            <datalist id="districts">
              {DISTRICTS.map((district) => <option key={district} value={district} />)}
            </datalist>
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-semibold text-navy-900">Specialization</span>
            <select className={fieldClass} value={specialization} onChange={(event) => setSpecialization(event.target.value)}>
              <option value="">Any specialization</option>
              {SPECIALIZATIONS.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-semibold text-navy-900">Experience</span>
            <select className={fieldClass} value={experience} onChange={(event) => setExperience(event.target.value)}>
              <option value="">Any experience</option>
              {EXPERIENCE_FILTERS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </label>
          <div className="flex items-end">
            <button type="submit" className="w-full rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white">Apply filters</button>
          </div>
        </FilterPanel>
      </form>
      {loading && !data ? <LoadingSpinner label="Loading lawyers" /> : null}
      {error && !data ? <ErrorMessage message={getErrorMessage(error)} onRetry={reload} /> : null}
      {data && (
        <>
          <p className="text-sm text-muted">
            {typeof total === 'number' ? `Showing ${items.length} of ${total} lawyers` : `${items.length} lawyer${items.length === 1 ? '' : 's'}`}
          </p>
          {items.length === 0 ? (
            <EmptyState title="No lawyers match these filters" description="Try another name, location, or practice area. Verified profiles appear here when the server returns them." />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {items.map((lawyer) => (
                <LawyerCard key={lawyer.id || lawyer.email || lawyer.name} lawyer={lawyer} href={lawyer.id ? getProfilePath(lawyer.id) : ''} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
