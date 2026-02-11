"use client"

import { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary捕获到错误:", error, errorInfo)
    // 这里可以发送错误到监控服务，如Sentry
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
          <div className="mb-6 text-6xl">😵</div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            出错了
          </h2>
          <p className="mb-6 max-w-md text-gray-600 dark:text-gray-400">
            页面遇到了一些问题，请尝试刷新页面或返回首页
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-purple-600 px-6 py-3 font-medium text-white transition-all hover:bg-purple-700 hover:shadow-lg"
            >
              刷新页面
            </button>
            <a
              href="/"
              className="rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              返回首页
            </a>
          </div>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <pre className="mt-8 max-w-2xl overflow-auto rounded-lg bg-gray-100 p-4 text-left text-sm text-red-600 dark:bg-gray-900">
              {this.state.error.message}
              {"\n"}
              {this.state.error.stack}
            </pre>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

// 简化版错误边界hook
export function useErrorHandler() {
  return (error: Error) => {
    console.error("捕获到错误:", error)
    // 可以在这里发送错误到监控服务
  }
}
