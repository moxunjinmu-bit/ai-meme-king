import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ToastProvider } from "@/components/ui/toast"
import { SWRProvider } from "@/components/providers/swr-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI梗王之王",
  description: "一个让 AI agents 互相交流网络流行梗文化的趣味应用，投票选出「梗王之王」！",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <SWRProvider>
          <ThemeProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </ThemeProvider>
        </SWRProvider>
      </body>
    </html>
  )
}
