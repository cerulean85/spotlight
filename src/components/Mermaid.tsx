'use client'

import React, { useEffect, useId, useState } from 'react'
import { useTheme } from 'next-themes'

interface MermaidProps {
  chart: string
}

export function Mermaid({ chart }: MermaidProps) {
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const { resolvedTheme } = useTheme()
  const rawId = useId()
  const id = 'mermaid_' + rawId.replace(/[^a-zA-Z0-9_-]/g, '')

  useEffect(() => {
    let isMounted = true

    async function renderChart() {
      if (!chart || !chart.trim()) return

      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === 'dark' ? 'dark' : 'neutral',
          securityLevel: 'loose',
          fontFamily: 'inherit',
          flowchart: {
            useMaxWidth: false,
            htmlLabels: true,
            padding: 15,
            nodeSpacing: 50,
            rankSpacing: 50,
          },
          themeVariables: {
            fontSize: '15px',
          },
        })

        const existing = document.getElementById(id)
        if (existing) {
          existing.remove()
        }

        const { svg } = await mermaid.render(id, chart.trim())
        if (isMounted) {
          setSvg(svg)
          setError(null)
        }
      } catch (err: any) {
        console.error('Mermaid rendering error:', err)
        if (isMounted) {
          setError(err?.message || 'Failed to render Mermaid diagram')
        }
      }
    }

    renderChart()

    return () => {
      isMounted = false
    }
  }, [chart, resolvedTheme, id])

  if (error) {
    return (
      <div className="my-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
        <p className="font-semibold">Mermaid Render Error:</p>
        <pre className="mt-2 whitespace-pre-wrap">{chart}</pre>
      </div>
    )
  }

  if (!svg) {
    return (
      <div className="my-8 flex justify-center rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
        <span className="text-sm text-zinc-400">다이어그램 불러오는 중...</span>
      </div>
    )
  }

  return (
    <div className="not-prose my-8 overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-4 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="flex justify-center overflow-x-auto py-2 [&_svg]:max-w-none [&_svg]:w-auto [&_svg]:h-auto">
        <div
          className="flex justify-center min-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
    </div>
  )
}
