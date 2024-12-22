"use server"

import { signIn, signOut } from "@/app/auth"

export async function signInAction() {
  await signIn("google", { redirectTo: "/dashboard" })
  return
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" })
  return
}

