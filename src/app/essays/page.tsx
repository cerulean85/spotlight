import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type ArticleWithSlug, getAllEssays } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function Essay({ essay }: { essay: ArticleWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/essays/${essay.slug}`}>{essay.title}</Card.Title>
        <Card.Eyebrow as="time" dateTime={essay.date} className="md:hidden" decorate>
          {formatDate(essay.date)}
        </Card.Eyebrow>
        <Card.Description className="line-clamp-3">{essay.description}</Card.Description>
        <Card.Cta>Read essay</Card.Cta>
      </Card>
      <Card.Eyebrow as="time" dateTime={essay.date} className="mt-1 max-md:hidden">
        {formatDate(essay.date)}
      </Card.Eyebrow>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Essays',
  description: '소프트웨어 설계 및 개발에 관하여 작성한 에세이를 공유합니다.',
}

export default async function EssaysIndex() {
  let essays = await getAllEssays()

  return (
    <SimpleLayout
      title="ESSAYS"
      intro="소프트웨어 설계 및 개발에 관하여 작성한 에세이를 공유합니다."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {essays.map((essay) => (
            <Essay key={essay.slug} essay={essay} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
