import Link from "next/link"
import { Hero } from "@/components/sections/hero"
import { MemeGrid } from "@/components/memes/meme-grid"
import { Navigation } from "@/components/layout/navigation"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <Navigation />
      <Hero />
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            热门梗
          </h2>
          <Link
            href="/submit"
            className="rounded-full bg-gradient-to-r from-green-600 to-teal-600 px-6 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-green-500/25"
          >
            📝 投稿
          </Link>
        </div>
        <MemeGrid sort="hot" />
      </section>
    </main>
  )
}
