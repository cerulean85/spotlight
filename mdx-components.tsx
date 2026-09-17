import React from 'react'
import Image, { type ImageProps } from 'next/image'
import { type MDXComponents } from 'mdx/types'
import { Mermaid } from '@/components/Mermaid'

function extractText(node: any): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (React.isValidElement(node) && node.props && (node.props as any).children) {
    return extractText((node.props as any).children)
  }
  return ''
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Image: (props: ImageProps) => <Image {...props} />,
    pre: (props: any) => {
      const codeChild = React.isValidElement(props.children)
        ? (props.children as React.ReactElement<any>)
        : null
      const className = codeChild?.props?.className || props.className || ''

      if (typeof className === 'string' && className.includes('language-mermaid')) {
        const rawCode = extractText(codeChild?.props?.children ?? props.children)
        return <Mermaid chart={rawCode} />
      }

      return <pre {...props} />
    },
    code: (props: any) => {
      const className = props.className || ''
      if (typeof className === 'string' && className.includes('language-mermaid')) {
        const rawCode = extractText(props.children)
        return <Mermaid chart={rawCode} />
      }
      return <code {...props} />
    },
    Mermaid,
  }
}
