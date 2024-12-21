'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { menuItems } from '../sidebar'

const mobileMenuItems = [...menuItems]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className=" overflow-hidden fixed bottom-0 left-0 right-0 z-50 bg-primary-foreground border-t md:hidden">
      <div className="flex justify-around gap-1 items-center">
        {mobileMenuItems.map((item) => (
          <Link
            prefetch
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center w-full gap-1 my-1 py-1  text-xs rounded-md",
              pathname === item.href
                ? "text-sky-500 bg-sky-500/10 "
                : "text-secondary-foreground  hover:bg-sky-500/20 "
            )}
          >
            <item.icon className="h-6 w-6" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

