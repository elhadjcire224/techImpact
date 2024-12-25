import { fetchMembers } from "@/lib/actions/members.actions"
import { UserRole } from "@/types/user_roles"
import { useCallback, useEffect, useState } from "react"

export function useMembers() {
  const [members, setMembers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole | 'all'>('all')

  const getMembers = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await fetchMembers({
        searchQuery,
        role: selectedRole
      })
      setMembers(data)
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setIsLoading(false)
    }
  }, [searchQuery, selectedRole])

  useEffect(() => {
    getMembers()
  }, [getMembers])

  return {
    members,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedRole,
    setSelectedRole
  }
}
