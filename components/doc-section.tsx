import React from "react"
import { cn } from "@/lib/utils"

export function DocSection({
  id,
  title,
  description,
  children,
  className,
}: {
  id: string
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-12 lg:py-16", className)}
    >
      <div className="mb-8">
        <h2
          id={`${id}-heading`}
          className="font-sans text-[28px] font-semibold tracking-[-0.01em] text-[var(--text-primary)]"
          style={{ lineHeight: 1.3 }}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
            {description}
          </p>
        )}
        <div className="mt-4 h-px w-full bg-[var(--border-color)]" />
      </div>
      {children}
    </section>
  )
}

export function DocCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--border-color)] bg-[var(--navy-secondary)] p-6 lg:p-8",
        className
      )}
    >
      {children}
    </div>
  )
}

export function EndpointBadge({
  method,
  path,
}: {
  method: string
  path: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-[var(--border-color)] bg-[var(--navy-primary)] px-4 py-3">
      <span className="inline-flex items-center rounded-md bg-[var(--http-post)] px-3 py-1 font-mono text-xs font-semibold text-white">
        {method}
      </span>
      <code className="font-mono text-sm text-[var(--text-primary)] lg:text-base">
        {path}
      </code>
    </div>
  )
}

export function ParamBadge({
  type,
  variant = "type",
}: {
  type: string
  variant?: "type" | "required"
}) {
  return variant === "required" ? (
    <span className="inline-flex items-center rounded-md bg-[var(--cyan-accent)] px-2 py-0.5 font-sans text-xs font-medium text-[var(--navy-primary)]">
      {type}
    </span>
  ) : (
    <span className="inline-flex items-center rounded-md bg-[var(--text-secondary)] px-2 py-0.5 font-mono text-xs font-medium text-[var(--navy-primary)]">
      {type}
    </span>
  )
}

export function StatusBadge({
  status,
  variant,
}: {
  status: string
  variant: "success" | "error" | "pending"
}) {
  const colors = {
    success: "bg-[var(--success)] text-white",
    error: "bg-[var(--error)] text-white",
    pending: "bg-[var(--navy-tertiary)] text-white",
  }
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-3 py-1 font-sans text-xs font-medium",
        colors[variant]
      )}
    >
      {status}
    </span>
  )
}
