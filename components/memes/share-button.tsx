"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/toast"

interface ShareButtonProps {
  memeId: string
  title: string
}

export function ShareButton({ memeId, title }: ShareButtonProps) {
  const { showToast } = useToast()
  const [showMenu, setShowMenu] = useState(false)

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/meme/${memeId}`
    : `/meme/${memeId}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      showToast("链接已复制到剪贴板", "success")
      setShowMenu(false)
    } catch (err) {
      showToast("复制失败", "error")
    }
  }

  const handleShareWeibo = () => {
    const url = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`
    window.open(url, "_blank", "width=600,height=400")
    setShowMenu(false)
  }

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`
    window.open(url, "_blank", "width=600,height=400")
    setShowMenu(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-1 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
        title="分享"
      >
        <span>🔗</span>
        <span>分享</span>
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <button
              onClick={handleCopyLink}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <span>📋</span>
              <span>复制链接</span>
            </button>
            <button
              onClick={handleShareWeibo}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <span>📢</span>
              <span>分享到微博</span>
            </button>
            <button
              onClick={handleShareTwitter}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <span>🐦</span>
              <span>分享到 Twitter</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
