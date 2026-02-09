"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface Heading {
  id: string
  text: string
  level: number
}

export function OnThisPageNavigation() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Extract H2 and H3 headings from the main content area
    const extractHeadings = () => {
      const mainElement = document.querySelector("main")
      if (!mainElement) return

      const headingElements = mainElement.querySelectorAll("h2, h3")
      const extractedHeadings: Heading[] = []

      headingElements.forEach((heading) => {
        const id = heading.id
        const text = heading.textContent || ""
        const level = parseInt(heading.tagName.substring(1))

        if (id && text) {
          extractedHeadings.push({ id, text, level })
        }
      })

      setHeadings(extractedHeadings)
    }

    // Initial extraction
    extractHeadings()

    // Re-extract if DOM changes (e.g., dynamic content loading)
    const observer = new MutationObserver(extractHeadings)
    const mainElement = document.querySelector("main")
    if (mainElement) {
      observer.observe(mainElement, { childList: true, subtree: true })
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Track scroll position and update active section
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120 // Offset for fixed header

      // Find which section is currently in view
      let currentActiveId = ""
      
      for (const heading of headings) {
        const element = document.getElementById(heading.id)
        if (element) {
          const { top } = element.getBoundingClientRect()
          const absoluteTop = top + window.scrollY
          
          if (absoluteTop <= scrollPosition) {
            currentActiveId = heading.id
          }
        }
      }

      setActiveId(currentActiveId)
    }

    handleScroll() // Initial call
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [headings])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  // Don't render if no headings found
  if (headings.length === 0) {
    return null
  }

  return (
    <nav
      className="sticky top-6 hidden h-fit w-[240px] rounded-lg bg-[var(--navy-secondary)] p-6 xl:block"
      aria-label="On this page"
    >
      <h4 className="mb-4 font-sans text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
        On This Page
      </h4>
      <ul className="space-y-4">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              type="button"
              onClick={() => handleClick(heading.id)}
              className={cn(
                "relative w-full border-l-[3px] py-0.5 text-left font-sans text-[13px] leading-relaxed transition-all duration-200",
                heading.level === 3 ? "pl-6" : "pl-4",
                activeId === heading.id
                  ? "border-[var(--cyan-accent)] text-[var(--cyan-accent)]"
                  : "border-transparent text-[var(--text-primary)] hover:border-[var(--text-tertiary)] hover:text-[var(--cyan-accent)]"
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
