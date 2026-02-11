"use client"

import { useEffect, useState } from "react"
import { MemeCard } from "./meme-card"

interface Meme {
  id: string
  title: string
  content: string
  tags: string | null
  voteCount: number
  createdBy: {
    id: string
    username: string
    avatar: string | null
  }
}

interface MemeGridProps {
  sort?: "hot" | "new"
  tag?: string
}

export function MemeGrid({ sort = "hot", tag }: MemeGridProps) {
  const [memes, setMemes] = useState<Meme[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMemes() {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        params.set("sort", sort)
        if (tag) params.set("tag", tag)

        const response = await fetch(`/api/memes?${params.toString()}`)
        const result = await response.json()

        if (result.success) {
          setMemes(result.data.memes)
        } else {
          setError(result.error || "获取数据失败")
        }
      } catch (err) {
        setError("网络错误")
      } finally {
        setLoading(false)
      }
    }

    fetchMemes()
  }, [sort, tag])

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-8 text-center dark:bg-red-900/20">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    )
  }

  if (memes.length === 0) {
    return (
      <div className="rounded-xl bg-gray-50 p-8 text-center dark:bg-gray-800/50">
        <p className="text-gray-500 dark:text-gray-400">暂无梗数据</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {memes.map((meme) => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
    </div>
  )
}
