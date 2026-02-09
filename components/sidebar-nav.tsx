"use client"

import React from "react"

import { useState, useMemo, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import {
  Search,
  BookOpen,
  Shield,
  Users,
  ArrowDownToLine,
  ArrowUpFromLine,
  Webhook,
  AlertCircle,
  CreditCard,
  Settings,
  X,
  Menu,
  Command,
} from "lucide-react"

interface NavSection {
  id: string
  label: string
  icon: React.ReactNode
  children?: { id: string; label: string }[]
}

const navSections: NavSection[] = [
  {
    id: "introduction",
    label: "Introduction",
    icon: <BookOpen className="size-4" />,
    children: [
      { id: "overview", label: "Overview" },
      { id: "process-flow", label: "Process Flow" },
    ],
  },
  {
    id: "authorization",
    label: "Authorization",
    icon: <Shield className="size-4" />,
    children: [
      { id: "required-headers", label: "Required Headers" },
      { id: "hmac-signature", label: "HMAC Signature" },
    ],
  },
  {
    id: "user-validation",
    label: "User Validation",
    icon: <Users className="size-4" />,
  },
  {
    id: "deposits",
    label: "Deposit Creation",
    icon: <ArrowDownToLine className="size-4" />,
  },
  {
    id: "payouts",
    label: "Payout Creation",
    icon: <ArrowUpFromLine className="size-4" />,
  },
  {
    id: "webhooks",
    label: "Webhooks",
    icon: <Webhook className="size-4" />,
    children: [
      { id: "webhook-payout-confirm", label: "Payout Confirmation" },
      { id: "webhook-final-status", label: "Final Status" },
    ],
  },
  {
    id: "error-codes",
    label: "Error Codes",
    icon: <AlertCircle className="size-4" />,
  },
  {
    id: "payment-methods",
    label: "Payment Methods",
    icon: <CreditCard className="size-4" />,
  },
  {
    id: "account-management",
    label: "Account Management",
    icon: <Settings className="size-4" />,
  },
]

export function SidebarNav({
  activeSection,
  onNavigate,
}: {
  activeSection: string
  onNavigate: (id: string) => void
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return navSections
    const q = searchQuery.toLowerCase()
    return navSections.filter(
      (s) =>
        s.label.toLowerCase().includes(q) ||
        s.children?.some((c) => c.label.toLowerCase().includes(q))
    )
  }, [searchQuery])

  const handleNav = (id: string) => {
    onNavigate(id)
    setMobileOpen(false)
  }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Search */}
      <div className="p-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--navy-primary)] py-2.5 pl-10 pr-10 font-sans text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--cyan-accent)] focus:outline-none"
          />
          <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 text-[10px] text-[var(--text-tertiary)] lg:flex">
            <Command className="size-3" />K
          </span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-3 py-2" aria-label="Documentation navigation">
        {filteredSections.length === 0 && (
          <p className="px-3 py-4 text-xs text-[var(--text-tertiary)]">
            No results found
          </p>
        )}
        {filteredSections.map((section) => (
          <div key={section.id} className="mb-1">
            <button
              type="button"
              onClick={() => handleNav(section.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                activeSection === section.id
                  ? "border-l-[3px] border-[var(--cyan-accent)] bg-[var(--navy-primary)] text-[var(--cyan-accent)]"
                  : "border-l-[3px] border-transparent text-[var(--text-primary)] hover:bg-[var(--navy-primary)]"
              )}
            >
              <span className="text-[var(--text-tertiary)]">{section.icon}</span>
              {section.label}
            </button>
            {section.children && (
              <div className="ml-6 border-l border-[var(--border-color)] pl-3">
                {section.children.map((child) => (
                  <button
                    type="button"
                    key={child.id}
                    onClick={() => handleNav(child.id)}
                    className={cn(
                      "flex w-full items-center px-3 py-1.5 text-sm transition-colors duration-200",
                      activeSection === child.id
                        ? "text-[var(--cyan-accent)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Version badge */}
      <div className="border-t border-[var(--border-color)] p-4">
        <span className="inline-block rounded-full bg-[var(--navy-primary)] px-3 py-1 font-mono text-xs text-[var(--cyan-accent)]">
          API v4.0
        </span>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--navy-secondary)] p-2.5 text-[var(--text-primary)] lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            onKeyDown={() => {}}
            role="presentation"
          />
          <aside className="absolute left-0 top-0 h-full w-[280px] bg-[var(--navy-secondary)] shadow-2xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 rounded-md p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              aria-label="Close navigation"
            >
              <X className="size-5" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:z-40 lg:flex lg:h-screen lg:w-[280px] lg:flex-col lg:border-r lg:border-[var(--border-color)] lg:bg-[var(--navy-secondary)]">
        {sidebarContent}
      </aside>
    </>
  )
}
