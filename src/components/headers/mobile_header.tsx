import { Logo } from "../logo";
import { ModeToggle } from "../toggle_theme_button";

export function MobileHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-foreground border-b md:hidden">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

