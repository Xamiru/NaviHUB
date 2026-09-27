import { Component, type ErrorInfo, type ReactNode } from 'react'
import ThemedFailure from './theme/ThemedFailure'

interface Props {
  children: ReactNode
}
interface State {
  error: Error | null
}

// Catches render/effect errors from the routed page so one crashing page shows a
// recoverable message instead of blanking the whole window. Reset it by changing
// its `key` (App keys it on the route path, so navigating clears the error).
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Page crashed:', error, info)
  }

  render(): ReactNode {
    const { error } = this.state
    if (!error) return this.props.children
    return (
      <div className="mx-auto max-w-2xl p-8">
        <ThemedFailure
          message={`This page crashed: ${error.message}. The rest of the app is fine.`}
          onRetry={() => this.setState({ error: null })}
        />
        <button className="btn-ghost mt-3" onClick={() => window.location.reload()}>
          Reload app
        </button>
      </div>
    )
  }
}
