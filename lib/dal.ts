'use server'
import { decrypt } from "@/app/features/session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const verifySession = (async() => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (! session?.userId) {
    redirect('/signup')
  }
  return { isAuth: true, userId: session.userId }
})