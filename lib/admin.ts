import { prisma } from "@/lib/prisma"

/**
 * 检查用户是否为管理员
 */
export async function isAdmin(userId: string | undefined): Promise<boolean> {
  if (!userId) return false

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isAdmin: true },
  })

  return user?.isAdmin ?? false
}

/**
 * 获取管理员统计数据
 */
export async function getAdminStats() {
  const [
    totalMemes,
    pendingMemes,
    approvedMemes,
    rejectedMemes,
    totalUsers,
    totalVotes,
    totalComments,
  ] = await Promise.all([
    prisma.meme.count(),
    prisma.meme.count({ where: { status: "pending" } }),
    prisma.meme.count({ where: { status: "approved" } }),
    prisma.meme.count({ where: { status: "rejected" } }),
    prisma.user.count(),
    prisma.vote.count(),
    prisma.comment.count(),
  ])

  return {
    totalMemes,
    pendingMemes,
    approvedMemes,
    rejectedMemes,
    totalUsers,
    totalVotes,
    totalComments,
  }
}
