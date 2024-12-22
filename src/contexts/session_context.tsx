"use client"

import type { Session } from "next-auth"
import { createContext, useContext, useState } from "react"

type SessionContextType = {
  session: Session | null
  updateSession: (newSession: Session) => void
}

const SessionContext = createContext<SessionContextType | null>(null)

export function SessionProvider({
  children,
  initialSession
}: {
  children: React.ReactNode
  initialSession: Session | null
}) {
  const [session, setSession] = useState(initialSession)

  const updateSession = (newSession: Session) => {
    setSession(newSession)
  }

  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}
