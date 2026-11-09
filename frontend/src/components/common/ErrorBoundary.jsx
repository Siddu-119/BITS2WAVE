import { Component } from 'react'
import ErrorMessage from './ErrorMessage'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="mx-auto max-w-xl p-6">
          <ErrorMessage
            title="This page could not be displayed"
            message="Refresh the page. If it continues, the interface needs a fix before it can continue."
            onRetry={() => window.location.reload()}
          />
        </div>
      )
    }
    return this.props.children
  }
}
