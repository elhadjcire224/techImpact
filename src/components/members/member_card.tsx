import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { UserRole } from "@/types/user_roles"
import Link from "next/link"

interface MemberCardProps {
  id: string
  name: string
  email: string
  image: string
  bio: string
  skills: string[] // Update skills type to match DB structure
  initials: string
  role: UserRole
  github?: string
}

export function MemberCard({
  id,
  name,
  email,
  image,
  bio,
  skills,
  initials,
  role,
}: MemberCardProps) {
  return (
    <Link href={`members/${id}`}>
      <Card className="bg-primary-foreground text-secondary-foreground border-2 overflow-hidden">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-14 w-14 border-2">
            <AvatarImage src={image} />
            <AvatarFallback className="bg-zinc-900 text-zinc-400">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{name}</h3>
              {role === UserRole.MENTOR && (
                <Badge className="bg-purple-500/10 text-purple-500">
                  Mentor
                </Badge>
              )}
            </div>
            <p className="text-gray-400 text-sm">{email}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-zinc-400 text-sm line-clamp-2">{bio}</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="bg-sky-500/10 text-sky-300 hover:bg-sky-500/20"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

