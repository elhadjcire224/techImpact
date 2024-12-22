
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getInitials } from "@/lib/utils"
import { SignOut } from "./auth/signout_button"
import { Button } from "./ui/button"
import Link from "next/link"
import { User2 } from "lucide-react"

export default function UserAvatar({ image, name, email }: { image: string, name: string, email: string }) {

  return (
    <Popover >
      <PopoverTrigger asChild className="border-2 border-foreground mr-4 ">
        <Avatar>
          <AvatarImage src={image || ''} alt={name || ''} />
          <AvatarFallback >{getInitials(name!)}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className=" w-32 flex flex-col p-0 gap-1 b</PopoverContent>g-secondary">

        <Button asChild>
          <Link href={'/profile'} >
            <User2 />
            <p>Profile</p>
          </Link>
        </Button>
        <SignOut />

      </PopoverContent>
    </Popover>
  )
}