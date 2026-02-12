"use client"

import { useAuth } from "@/lib/auth"
import { LoginPrompt } from "./login-prompt"

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  title?: string
  description?: string
  icon?: string
}

export function AuthGuard({
  children,
  fallback,
  title,
  description,
  icon,
}: AuthGuardProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <LoginPrompt
        title={title}
        description={description}
        icon={icon}
      />
    )
  }

  return <>{children}</>
}
