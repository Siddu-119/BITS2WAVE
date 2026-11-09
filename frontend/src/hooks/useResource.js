import { useCallback, useEffect, useState } from 'react'

export function useResource(loader, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null })
  const [version, setVersion] = useState(0)

  useEffect(() => {
    let active = true
    setState((current) => ({ data: current.data, loading: true, error: null }))
    Promise.resolve()
      .then(loader)
      .then((data) => {
        if (active) setState({ data, loading: false, error: null })
      })
      .catch((error) => {
        if (active) setState((current) => ({ data: current.data, loading: false, error }))
      })
    return () => {
      active = false
    }
    // The loader closes over the latest deps for this render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, ...deps])

  const reload = useCallback(() => setVersion((value) => value + 1), [])
  return { ...state, reload }
}

export function useDebouncedValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(timer)
  }, [value, delay])
  return debounced
}
