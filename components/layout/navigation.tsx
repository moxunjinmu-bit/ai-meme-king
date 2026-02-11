"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useTheme } from "@/components/providers/theme-provider"
import { useAuth } from "@/lib/auth"

export function Navigation() {
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-purple-200/50 bg-white/80 backdrop-blur-lg dark:bg-gray-900/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">🎭</span>
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent">
            AI梗王之王
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            href="/rankings"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
          >
            排行榜
          </Link>
          <Link
            href="/chat"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
          >
            AI 聊天
          </Link>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="rounded-full p-2 transition-all hover:bg-purple-100 dark:hover:bg-purple-900"
              aria-label="切换主题"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          )}

          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {user.username}
              </span>
              <button
                onClick={logout}
                className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                退出
              </button>
            </div>
          ) : (
            <a
              href="/api/auth/login"
              className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-purple-500/25"
            >
              登录
            </a>
          )}
        </div>
      </div>
    </nav>
  )
}
