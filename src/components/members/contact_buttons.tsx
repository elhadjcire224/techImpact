'use client'

import { Button } from "@/components/ui/button"
import { Github, Globe, Mail, Phone } from "lucide-react"

interface ContactButtonsProps {
  email?: string | null
  phone?: string | null
  github?: string | null
  portfolio?: string | null
  cvPath?: string | null
}

export function ContactButtons({ email, phone, github, portfolio, cvPath }: ContactButtonsProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {email && (
          <Button
            variant="outline"
            className="group hover:bg-sky-500/10 hover:text-sky-500 hover:border-sky-500/20 transition-colors"
            onClick={() => window.location.href = `mailto:${email}`}
          >
            <Mail className="h-4 w-4 mr-2 transition-colors" />
            <span className="truncate">{email}</span>
          </Button>
        )}

        {phone && (
          <Button
            variant="outline"
            className="group hover:bg-green-500/10 hover:text-green-500 hover:border-green-500/20 transition-colors"
            onClick={() => window.location.href = `tel:${phone}`}
          >
            <Phone className="h-4 w-4 mr-2" />
            <span className="truncate">{phone}</span>
          </Button>
        )}

        {github && (
          <Button
            variant="outline"
            className="group hover:bg-violet-500/10 hover:text-violet-500 hover:border-violet-500/20 transition-colors"
            onClick={() => window.open(github, '_blank')}
          >
            <Github className="h-4 w-4 mr-2" />
            <span className="truncate">GitHub Profile</span>
          </Button>
        )}

        {portfolio && (
          <Button
            variant="outline"
            className="group hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500/20 transition-colors"
            onClick={() => window.open(portfolio, '_blank')}
          >
            <Globe className="h-4 w-4 mr-2" />
            <span className="truncate">Portfolio</span>
          </Button>
        )}
      </div>

      {cvPath && (
        <div className="mt-6">
          <Button
            className="w-full bg-primary/90 hover:bg-primary"
            onClick={() => window.open(cvPath, '_blank')}
          >
            View CV
          </Button>
        </div>
      )}
    </>
  )
}
