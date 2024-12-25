'use client'

import { MemberCard } from "@/components/members/member_card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMembers } from "@/hooks/use_members"
import { UserRole } from "@/types/user_roles"
import { Search } from "lucide-react"
import { MemberCardSkeleton } from "@/components/members/member_card_skeleton"

export default function MembersPage() {
  const {
    members,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedRole,
    setSelectedRole
  } = useMembers()

  return (
    <div className="container mx-auto py-6 my-8 space-y-6 md:my-0">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={selectedRole}
          onValueChange={(value) => setSelectedRole(value as UserRole | 'all')}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Members</SelectItem>
            <SelectItem value={UserRole.MENTOR}>Mentors</SelectItem>
            <SelectItem value={UserRole.USER}>Users</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <MemberCardSkeleton key={i} />
          ))
        ) : (
          members.map((member) => (
            <MemberCard
              key={member.id}
              id={member.id}
              name={member.name}
              email={member.email}
              image={member.image}
              bio={member.bio || 'No bio provided'}
              skills={member.skills || []}
              initials={member.name?.slice(0, 2) || 'XX'}
              role={member.role}
              github={member.github}
            />
          ))
        )}
      </div>
    </div>
  )
}