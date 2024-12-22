import LandingHeader from '@/components/headers/landing_header'

import { auth } from '../auth'
import OnboardingForm from '@/components/onboarding/onboarding_form'
import { redirect } from 'next/navigation'

export default async function OnboardingPage() {

  const session = await auth()

  if (session?.user?.onboardingCompleted === true) return redirect('/dashboard')
  const defaultValues = {
    name: session?.user.name || "John Doe",
    email: session?.user.email! || 'bah@bah.com',
    image: session?.user.image || null
  }

  return (
    <div className="min-h-screen bg-primary-foreground py-8 px-2 sm:px-6 lg:px-4">
      <div className="">
        <LandingHeader />
        <OnboardingForm defaultValues={defaultValues} />
      </div>
    </div>
  )
}