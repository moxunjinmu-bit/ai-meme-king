"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/ui/toast"

interface MemeCardProps {
  meme: {
    id: string
    title: string
    content: string
    tags?: string | null
    voteCount: number
    createdBy?: {
      id: string
      username: string
      avatar: string | null
    }
  }
}

export function MemeCard({ meme }: MemeCardProps) {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [voted, setVoted] = useState(false)
  const [votes, setVotes] = useState(meme.voteCount)
  const [loading, setLoading] = useState(false)
  const [favorited, setFavorited] = useState(false)
  const [favoriteLoading, setFavoriteLoading] = useState(false)

  // 检查用户是否已投票
  useEffect(() => {
    async function checkVoteStatus() {
      if (!user?.id) return

      try {
        const response = await fetch(
          `/api/memes/${meme.id}/vote?userId=${user.id}`
        )
        const result = await response.json()
        if (result.success) {
          setVoted(result.data.voted)
        }
      } catch (error) {
        console.error("检查投票状态失败:", error)
      }
    }

    checkVoteStatus()
  }, [meme.id, user?.id])

  // 检查用户是否已收藏
  useEffect(() => {
    async function checkFavoriteStatus() {
      if (!user?.id) return

      try {
        const response = await fetch(`/api/memes/${meme.id}/favorite`)
        const result = await response.json()
        if (result.success) {
          setFavorited(result.data.favorited)
        }
      } catch (error) {
        console.error("检查收藏状态失败:", error)
      }
    }

    checkFavoriteStatus()
  }, [meme.id, user?.id])

  const handleVote = async () => {
    if (!user?.id) {
      // 未登录，跳转到登录页
      window.location.href = "/api/auth/login"
      return
    }

    if (loading) return

    setLoading(true)
    try {
      const response = await fetch(`/api/memes/${meme.id}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: voted ? "downvote" : "upvote",
          userId: user.id,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setVoted(result.data.voted)
        setVotes((prev) => (result.data.voted ? prev + 1 : prev - 1))
        showToast(result.data.voted ? "投票成功！" : "已取消投票", "success")
      } else {
        showToast(result.error || "操作失败", "error")
      }
    } catch (error) {
      showToast("网络错误，请稍后重试", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleFavorite = async () => {
    if (!user?.id) {
      window.location.href = "/api/auth/login"
      return
    }

    if (favoriteLoading) return

    setFavoriteLoading(true)
    try {
      const response = await fetch(`/api/memes/${meme.id}/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: favorited ? "remove" : "add",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setFavorited(result.data.favorited)
        showToast(
          result.data.favorited ? "收藏成功！" : "已取消收藏",
          "success"
        )
      } else {
        showToast(result.error || "操作失败", "error")
      }
    } catch (error) {
      showToast("网络错误，请稍后重试", "error")
    } finally {
      setFavoriteLoading(false)
    }
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-purple-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 dark:border-purple-800/50 dark:bg-gray-800/80">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-pink-400/5 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />

      <Link href={`/meme/${meme.id}`} className="block">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {meme.title}
        </h3>
      </Link>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
        {meme.content}
      </p>

      {meme.tags && (
        <div className="mt-3 flex flex-wrap gap-2">
          {meme.tags.split(",").map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleVote}
            disabled={loading}
            className={`flex items-center space-x-1 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
              voted
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-gray-100 text-gray-700 transition-colors hover:bg-purple-100 hover:text-purple-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-purple-900/30 dark:hover:text-purple-400"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <span>{loading ? "..." : voted ? "已投票 ✓" : "👍 投票"}</span>
          </button>

          <button
            onClick={handleFavorite}
            disabled={favoriteLoading}
            className={`flex items-center space-x-1 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
              favorited
                ? "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400"
                : "bg-gray-100 text-gray-700 transition-colors hover:bg-pink-100 hover:text-pink-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-pink-900/30 dark:hover:text-pink-400"
            } ${favoriteLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            title={favorited ? "取消收藏" : "收藏"}
          >
            <span>{favoriteLoading ? "..." : favorited ? "♥ 已收藏" : "♡ 收藏"}</span>
          </button>
        </div>

        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
          {votes.toLocaleString()} 票
        </span>
      </div>
    </article>
  )
}
