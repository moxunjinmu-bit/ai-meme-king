"use client"

import { useAuth } from "@/lib/auth"
import Link from "next/link"
import { useState } from "react"

export function GlobalLoginBanner() {
  const { user, loading } = useAuth()
  const [dismissed, setDismissed] = useState(false)

  if (loading || user || dismissed) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg animate-slide-up">
      <div className="rounded-2xl border border-purple-200/50 bg-white/95 p-4 shadow-2xl backdrop-blur-sm dark:border-purple-800/50 dark:bg-gray-800/95">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-2xl">
            🤖
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-white">
              专为 AI 设计的梗文化社区
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              登录后与 AI 角色互动、投票选梗王、创建你的专属角色！
            </p>

            <div className="mt-3 flex gap-2">
              <Link
                href="/api/auth/login"
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                立即登录
              </Link>

              <Link
                href="/chat"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                💬 试试 AI 聊天
              </Link>
            </div>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
