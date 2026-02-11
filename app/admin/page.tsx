"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/layout/navigation"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/ui/toast"

interface Stats {
  totalMemes: number
  pendingMemes: number
  approvedMemes: number
  rejectedMemes: number
  totalUsers: number
  totalVotes: number
  totalComments: number
}

export default function AdminPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { showToast } = useToast()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/api/auth/login")
      return
    }

    if (user) {
      checkAdminAndFetchData()
    }
  }, [user, authLoading, router])

  async function checkAdminAndFetchData() {
    try {
      // 获取统计数据（同时验证管理员权限）
      const response = await fetch("/api/admin/stats")
      const result = await response.json()

      if (response.status === 403) {
        showToast("无权访问管理员页面", "error")
        router.push("/")
        return
      }

      if (result.success) {
        setStats(result.data)
        setIsAdmin(true)
      }
    } catch (error) {
      console.error("获取数据失败:", error)
      showToast("获取数据失败", "error")
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="h-32 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </main>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
            🛠️ 管理员后台
          </h1>

          {/* 统计卡片 */}
          {stats && (
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="总梗数"
                value={stats.totalMemes}
                color="purple"
              />
              <StatCard
                title="待审核"
                value={stats.pendingMemes}
                color="yellow"
                href="/admin/memes?status=pending"
              />
              <StatCard
                title="已通过"
                value={stats.approvedMemes}
                color="green"
              />
              <StatCard
                title="已拒绝"
                value={stats.rejectedMemes}
                color="red"
              />
              <StatCard
                title="总用户数"
                value={stats.totalUsers}
                color="blue"
              />
              <StatCard
                title="总投票数"
                value={stats.totalVotes}
                color="pink"
              />
              <StatCard
                title="总评论数"
                value={stats.totalComments}
                color="indigo"
              />
            </div>
          )}

          {/* 快捷操作 */}
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/admin/memes?status=pending"
              className="rounded-2xl border border-purple-200/50 bg-white/90 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:border-purple-800/50 dark:bg-gray-800/90"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                📋 审核梗
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                审核用户投稿的梗内容
              </p>
              {stats && stats.pendingMemes > 0 && (
                <span className="mt-4 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                  有 {stats.pendingMemes} 个待审核
                </span>
              )}
            </Link>

            <Link
              href="/admin/memes"
              className="rounded-2xl border border-purple-200/50 bg-white/90 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:border-purple-800/50 dark:bg-gray-800/90"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                🗂️ 管理梗
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                查看、编辑、删除所有梗
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

interface StatCardProps {
  title: string
  value: number
  color: "purple" | "yellow" | "green" | "red" | "blue" | "pink" | "indigo"
  href?: string
}

function StatCard({ title, value, color, href }: StatCardProps) {
  const colorClasses = {
    purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    pink: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
    indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  }

  const content = (
    <div
      className={`rounded-2xl p-6 ${colorClasses[color]} transition-all ${
        href ? "cursor-pointer hover:-translate-y-1 hover:shadow-lg" : ""
      }`}
    >
      <p className="text-sm font-medium opacity-80">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value.toLocaleString()}</p>
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
