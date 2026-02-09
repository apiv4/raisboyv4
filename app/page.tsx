"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { OnThisPageNavigation } from "@/components/on-this-page"
import { IntroductionSection } from "@/components/sections/introduction-section"
import { ProcessFlowSection } from "@/components/sections/process-flow-section"
import { AuthorizationSection } from "@/components/sections/authorization-section"
import { UserValidationSection } from "@/components/sections/user-validation-section"
import { DepositSection } from "@/components/sections/deposit-section"
import { PayoutSection } from "@/components/sections/payout-section"
import { WebhooksSection } from "@/components/sections/webhooks-section"
import { ErrorCodesSection } from "@/components/sections/error-codes-section"
import { PaymentMethodsSection } from "@/components/sections/payment-methods-section"
import { AccountManagementSection } from "@/components/sections/account-management-section"

export default function Page() {
  const [activeSection, setActiveSection] = useState("introduction")

  const handleNavigate = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-[var(--navy-primary)]">
      <SidebarNav activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main content area - offset for desktop sidebar */}
      <div className="lg:pl-[280px]">
        {/* Hero */}
        <HeroSection />

        {/* Content wrapper with right sidebar on desktop */}
        <div className="relative mx-auto max-w-[1440px] px-4 lg:px-8">
          <div className="flex gap-8">
            {/* Main content */}
            <main className="min-w-0 flex-1 pb-16 xl:max-w-[720px]">
              <IntroductionSection />
              <ProcessFlowSection />
              <AuthorizationSection />
              <UserValidationSection />
              <DepositSection />
              <PayoutSection />
              <WebhooksSection />
              <ErrorCodesSection />
              <PaymentMethodsSection />
              <AccountManagementSection />
            </main>

            {/* Right sidebar - On This Page Navigation */}
            <aside className="hidden xl:block xl:w-[240px]">
              <OnThisPageNavigation />
            </aside>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
