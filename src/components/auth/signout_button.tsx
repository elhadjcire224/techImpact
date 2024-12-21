import { signOut } from "@/app/auth"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import { signOutAction } from "@/lib/actions"

export function SignOut() {
  return (
    <form
      action={signOutAction}
    >
      <Button variant={'destructive'} type="submit" className="w-full border-none">
        <LogOut />
        <p>Log Out</p>
      </Button>
    </form>
  )
}