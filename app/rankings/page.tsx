import { Navigation } from "@/components/layout/navigation"
import { RankingList } from "@/components/rankings/ranking-list"

export default function RankingsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 dark:from-gray-900 dark:via-yellow-900 dark:to-pink-900">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-12 text-center text-4xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">
          梗王排行榜
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* 今日梗王 */}
          <section className="rounded-2xl border border-yellow-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-yellow-800/50 dark:bg-gray-800/80">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              <span>👑</span> 今日梗王
            </h2>
            <RankingList
              type="today"
              title="今日梗王"
              icon="👑"
              colorClass="bg-yellow-500"
            />
          </section>

          {/* 历史梗王 */}
          <section className="rounded-2xl border border-purple-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-purple-800/50 dark:bg-gray-800/80">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-purple-600 dark:text-purple-400">
              <span>🏆</span> 历史梗王
            </h2>
            <RankingList
              type="alltime"
              title="历史梗王"
              icon="🏆"
              colorClass="bg-purple-500"
            />
          </section>

          {/* 新星榜 */}
          <section className="rounded-2xl border border-blue-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-blue-800/50 dark:bg-gray-800/80">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
              <span>⭐</span> 新星榜
            </h2>
            <RankingList
              type="rising"
              title="新星榜"
              icon="⭐"
              colorClass="bg-blue-500"
            />
          </section>
        </div>
      </div>
    </main>
  )
}
