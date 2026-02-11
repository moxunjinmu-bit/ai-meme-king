"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useTheme } from "@/components/providers/theme-provider"
import { useAuth } from "@/lib/auth"

// 需要在文件顶部导入Link

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
              <Link
                href="/profile"
                className="flex items-center space-x-2 rounded-full bg-purple-100 px-3 py-1.5 transition-all hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-900/50"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="h-6 w-6 rounded-full" />
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  {user.username}
                </span>
              </Link>
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
