"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Check, Copy, ChevronRight } from "lucide-react"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function MethodBadge({ method }: { method: string }) {
  const colorMap: Record<string, string> = {
    GET: "#61AFFE",
    POST: "#49CC90",
    PUT: "#FCA130",
    PATCH: "#50E3C2",
    DELETE: "#F93E3E",
  }
  const bg = colorMap[method.toUpperCase()] ?? "#49CC90"

  return (
    <span
      className="inline-flex items-center rounded px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-white"
      style={{ backgroundColor: bg }}
    >
      {method}
    </span>
  )
}

function TypeBadge({ type }: { type: string }) {
  return (
    <span className="inline-flex items-center rounded bg-[var(--text-secondary)] px-2 py-0.5 font-mono text-[11px] font-medium text-[var(--navy-primary)]">
      {type}
    </span>
  )
}

function RequiredBadge({ required }: { required: boolean }) {
  return required ? (
    <span className="inline-flex items-center rounded bg-[var(--cyan-accent)] px-2 py-0.5 text-[11px] font-semibold text-[var(--navy-primary)]">
      required
    </span>
  ) : (
    <span className="inline-flex items-center rounded bg-[var(--navy-tertiary)] px-2 py-0.5 text-[11px] font-medium text-[var(--text-primary)]">
      optional
    </span>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard not available */
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md border border-[var(--border-color)] bg-[var(--navy-secondary)] px-2 py-1 text-[11px] text-[var(--text-secondary)] transition-colors hover:border-[var(--cyan-accent)] hover:text-[var(--cyan-accent)]"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? (
        <>
          <Check className="size-3" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="size-3" />
          <span>Copy</span>
        </>
      )}
    </button>
  )
}

function JsonBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="relative">
      {label && (
        <div className="mb-0 rounded-t-lg border border-b-0 border-[var(--border-color)] bg-[var(--navy-secondary)] px-4 py-2">
          <span className="text-xs font-medium text-[var(--text-secondary)]">{label}</span>
        </div>
      )}
      <div className={cn("relative overflow-x-auto rounded-lg border border-[var(--border-color)] bg-[var(--navy-primary)] p-4", label && "rounded-t-none border-t-0")}>
        <CopyButton text={code} />
        <pre className="pr-20 font-mono text-sm leading-relaxed text-[var(--text-primary)]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface EndpointParam {
  name: string
  type: string
  required: boolean
  description: string
}

export interface EndpointResponse {
  title: string
  statusCode?: number | string
  variant: "success" | "error"
  json: string
}

export interface EndpointErrorCode {
  code: number | string
  message: string
  description: string
}

export interface EndpointStatusCode {
  status: string
  variant: "success" | "error" | "pending"
  description: string
}

export interface EndpointDetailsCardProps {
  method: string
  path: string
  description: string
  parameters: EndpointParam[]
  responses: EndpointResponse[]
  errorCodes?: EndpointErrorCode[]
  statusCodes?: EndpointStatusCode[]
  className?: string
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function EndpointDetailsCard({
  method,
  path,
  description,
  parameters,
  responses,
  errorCodes,
  statusCodes,
  className,
}: EndpointDetailsCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-[var(--border-color)] bg-[var(--navy-secondary)]",
        className
      )}
    >
      {/* ---- Endpoint Header ---- */}
      <div className="border-b border-[var(--border-color)] bg-[var(--navy-primary)] px-5 py-4 lg:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <MethodBadge method={method} />
          <code className="break-all font-mono text-sm text-[var(--text-primary)] lg:text-base">
            {path}
          </code>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-6 p-5 lg:p-6">
        {/* ---- Request Parameters ---- */}
        {parameters.length > 0 && (
          <div>
            <h4 className="mb-3 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider text-[var(--cyan-accent)]">
              <ChevronRight className="size-4" />
              Request Parameters
            </h4>
            <div className="overflow-hidden rounded-lg border border-[var(--border-color)]">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[var(--border-color)] bg-[var(--navy-primary)] hover:bg-[var(--navy-primary)]">
                    <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                      Parameter
                    </TableHead>
                    <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                      Type
                    </TableHead>
                    <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                      Required
                    </TableHead>
                    <TableHead className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] sm:table-cell">
                      Description
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parameters.map((param, idx) => (
                    <TableRow
                      key={param.name}
                      className={cn(
                        "border-b border-[var(--border-color)] transition-colors hover:bg-[var(--navy-primary)]/40",
                        idx % 2 === 0
                          ? "bg-[var(--navy-secondary)]"
                          : "bg-[var(--navy-primary)]"
                      )}
                    >
                      <TableCell className="px-4 py-3">
                        <code className="rounded bg-[var(--navy-primary)] px-1.5 py-0.5 font-mono text-xs text-[var(--cyan-accent)]">
                          {param.name}
                        </code>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <TypeBadge type={param.type} />
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <RequiredBadge required={param.required} />
                      </TableCell>
                      <TableCell className="hidden px-4 py-3 text-sm text-[var(--text-secondary)] sm:table-cell">
                        {param.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* Mobile descriptions - shown below the table on small screens */}
            <div className="mt-3 flex flex-col gap-2 sm:hidden">
              {parameters.map((param) => (
                <div
                  key={`${param.name}-mobile`}
                  className="rounded border border-[var(--border-color)] bg-[var(--navy-primary)] px-3 py-2"
                >
                  <code className="font-mono text-xs text-[var(--cyan-accent)]">
                    {param.name}
                  </code>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    {param.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---- Status Codes ---- */}
        {statusCodes && statusCodes.length > 0 && (
          <div>
            <h4 className="mb-3 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider text-[var(--cyan-accent)]">
              <ChevronRight className="size-4" />
              Status Codes
            </h4>
            <div className="flex flex-wrap gap-3">
              {statusCodes.map((sc) => {
                const variantStyles: Record<string, string> = {
                  success: "border-[#2ECC71]/30 bg-[#2ECC71]/10",
                  error: "border-[#E74C3C]/30 bg-[#E74C3C]/10",
                  pending: "border-[var(--navy-tertiary)]/50 bg-[var(--navy-tertiary)]/10",
                }
                const dotStyles: Record<string, string> = {
                  success: "bg-[#2ECC71]",
                  error: "bg-[#E74C3C]",
                  pending: "bg-[var(--navy-tertiary)]",
                }
                return (
                  <div
                    key={sc.status}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border px-4 py-3",
                      variantStyles[sc.variant]
                    )}
                  >
                    <span
                      className={cn("size-2 shrink-0 rounded-full", dotStyles[sc.variant])}
                    />
                    <div>
                      <span className="block font-mono text-xs font-bold text-[var(--text-primary)]">
                        {sc.status}
                      </span>
                      <span className="block text-xs text-[var(--text-secondary)]">
                        {sc.description}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ---- Responses (Collapsible Accordions) ---- */}
        {responses.length > 0 && (
          <div>
            <h4 className="mb-3 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider text-[var(--cyan-accent)]">
              <ChevronRight className="size-4" />
              Responses
            </h4>
            <Accordion type="multiple" className="flex flex-col gap-2">
              {responses.map((resp, idx) => {
                const isSuccess = resp.variant === "success"
                const accentColor = isSuccess ? "#2ECC71" : "#E74C3C"

                return (
                  <AccordionItem
                    key={`resp-${idx}`}
                    value={`resp-${idx}`}
                    className="overflow-hidden rounded-lg border border-[var(--border-color)] bg-[var(--navy-primary)]"
                    style={{ borderLeftWidth: 3, borderLeftColor: accentColor }}
                  >
                    <AccordionTrigger className="px-4 py-3 text-sm font-medium text-[var(--text-primary)] hover:no-underline [&[data-state=open]>svg]:rotate-180">
                      <div className="flex items-center gap-2">
                        {resp.statusCode && (
                          <span
                            className="inline-flex items-center rounded px-2 py-0.5 font-mono text-[11px] font-bold text-white"
                            style={{ backgroundColor: accentColor }}
                          >
                            {resp.statusCode}
                          </span>
                        )}
                        <span>{resp.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <JsonBlock code={resp.json} />
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        )}

        {/* ---- Error Codes Reference ---- */}
        {errorCodes && errorCodes.length > 0 && (
          <div>
            <h4 className="mb-3 flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider text-[var(--cyan-accent)]">
              <ChevronRight className="size-4" />
              Error Codes
            </h4>
            <div className="overflow-hidden rounded-lg border border-[var(--border-color)]">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[var(--border-color)] bg-[var(--navy-primary)] hover:bg-[var(--navy-primary)]">
                    <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                      Code
                    </TableHead>
                    <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                      Message
                    </TableHead>
                    <TableHead className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] sm:table-cell">
                      Description
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {errorCodes.map((ec, idx) => (
                    <TableRow
                      key={`${ec.code}-${ec.message}`}
                      className={cn(
                        "border-b border-[var(--border-color)] transition-colors hover:bg-[var(--navy-primary)]/40",
                        idx % 2 === 0
                          ? "bg-[var(--navy-secondary)]"
                          : "bg-[var(--navy-primary)]"
                      )}
                    >
                      <TableCell className="px-4 py-3">
                        <span className="inline-flex items-center rounded bg-[#E74C3C]/15 px-2 py-0.5 font-mono text-xs font-bold text-[#E74C3C]">
                          {ec.code}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <code className="font-mono text-xs text-[var(--text-primary)]">
                          {ec.message}
                        </code>
                      </TableCell>
                      <TableCell className="hidden px-4 py-3 text-sm text-[var(--text-secondary)] sm:table-cell">
                        {ec.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
