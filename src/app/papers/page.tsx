import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type PaperWithSlug, getAllPapers } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function ExternalLinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M9.75 3.75h2.5v2.5M12.25 3.75 7.5 8.5M11 9.5v2.75H3.75V5H6.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Paper({ paper }: { paper: PaperWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/papers/${paper.slug}`}>{paper.title}</Card.Title>
        <Card.Eyebrow as="time" dateTime={paper.date} className="md:hidden" decorate>
          {formatDate(paper.date)}
        </Card.Eyebrow>
        <p className="relative z-10 mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {paper.venue}
        </p>
        <Card.Description className="line-clamp-3">{paper.description}</Card.Description>
        <div className="flex items-center gap-6">
          <Card.Cta>Read summary</Card.Cta>
          {/* z-30 lifts the link above the card's full-size overlay link (z-20) */}
          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-30 mt-4 flex items-center text-sm font-medium text-zinc-500 transition hover:text-teal-500 dark:text-zinc-400 dark:hover:text-teal-400"
          >
            원문 보기
            <ExternalLinkIcon className="ml-1 h-4 w-4 stroke-current" />
          </a>
        </div>
      </Card>
      <Card.Eyebrow as="time" dateTime={paper.date} className="mt-1 max-md:hidden">
        {formatDate(paper.date)}
      </Card.Eyebrow>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Papers',
  description: '학술지 및 학위 과정에서 발표한 논문을 공유합니다.',
}

export default async function PapersIndex() {
  let papers = await getAllPapers()

  return (
    <SimpleLayout title="PAPERS" intro="학술지 및 학위 과정에서 발표한 논문을 공유합니다.">
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {papers.map((paper) => (
            <Paper key={paper.slug} paper={paper} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
