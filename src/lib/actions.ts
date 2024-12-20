"use server"

import { signIn } from "@/app/auth"

export async function signInAction() {
  await signIn("google")
}