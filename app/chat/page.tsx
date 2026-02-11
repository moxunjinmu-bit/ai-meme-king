import { Navigation } from "@/components/layout/navigation"

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-pink-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          AI 角色聊天
        </h1>

        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-purple-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-purple-800/50 dark:bg-gray-800/80">
            <p className="text-center text-gray-500 dark:text-gray-400">
              敬请期待... AI 角色聊天功能正在开发中
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
