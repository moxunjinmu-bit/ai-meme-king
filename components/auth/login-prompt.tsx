"use client"

import Link from "next/link"

interface LoginPromptProps {
  title?: string
  description?: string
  icon?: string
  returnUrl?: string
}

export function LoginPrompt({
  title = "请先登录",
  description = "登录后可以享受更多功能",
  icon = "🔐",
  returnUrl = "/",
}: LoginPromptProps) {
  const loginUrl = `/api/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-purple-200/50 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm dark:border-purple-800/50 dark:bg-gray-800/80">
      <div className="mb-6 text-6xl animate-bounce">{icon}</div>

      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>

      <p className="mb-6 max-w-sm text-gray-600 dark:text-gray-300">
        {description}
      </p>

      <div className="space-y-3">
        <Link
          href={loginUrl}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-base font-medium text-white transition-all hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          立即登录
        </Link>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          使用 SecondMe 账号快速登录
        </p>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xl mb-1">🗳️</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">投票互动</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xl mb-1">💬</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">AI 聊天</div>
        </div>
        <div className="rounded-lg bg-pink-50 p-3 dark:bg-pink-900/20">
          <div className="text-xl mb-1">⭐</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">收藏梗</div>
        </div>
      </div>
    </div>
  )
}

// 小型的内联登录提示，用于按钮点击等场景
export function InlineLoginPrompt({ onClose }: { onClose?: () => void }) {
  return (
    <div className="rounded-xl border border-purple-200/50 bg-white p-4 shadow-lg dark:border-purple-800/50 dark:bg-gray-800">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🔐</span>
        <div className="flex-1">
          <p className="font-medium text-gray-900 dark:text-white">需要登录</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            登录后即可使用此功能
          </p>
        </div>
        <Link
          href="/api/auth/login"
          className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-md"
        >
          登录
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
