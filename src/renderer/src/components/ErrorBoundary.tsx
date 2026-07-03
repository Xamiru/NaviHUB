import { Component, type ErrorInfo, type ReactNode } from 'react'

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
      <div className="p-8 max-w-lg mx-auto">
        <div className="card p-6">
          <p className="text-lg font-semibold">Something went wrong on this page</p>
          <p className="mt-1 text-sm text-gray-400">
            The rest of the app is fine — go back or reload to continue.
          </p>
          <pre className="mt-3 max-h-40 overflow-auto whitespace-pre-wrap rounded bg-base-900 p-3 text-xs text-red-300">
            {error.message}
          </pre>
          <div className="mt-4 flex gap-2">
            <button className="btn-ghost" onClick={() => this.setState({ error: null })}>
              Try again
            </button>
            <button className="btn-primary" onClick={() => window.location.reload()}>
              Reload app
            </button>
          </div>
        </div>
      </div>
    )
  }
}
