import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type ProjectWithSlug, getAllProjects } from '@/lib/projects'
import { formatDate } from '@/lib/formatDate'

function Project({ project }: { project: ProjectWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/projects/${project.slug}`}>{project.title}</Card.Title>
        <Card.Eyebrow as="time" dateTime={project.date} className="md:hidden" decorate>
          {formatDate(project.date)}
        </Card.Eyebrow>
        <Card.Description>{project.description}</Card.Description>
        <Card.Cta>Read project</Card.Cta>
      </Card>
      <Card.Eyebrow as="time" dateTime={project.date} className="mt-1 max-md:hidden">
        {formatDate(project.date)}
      </Card.Eyebrow>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Projects',
  description: '문제를 해결하고 늘 새로운 기술에 도전합니다.',
}

export default async function ProjectsIndex() {
  let projects = await getAllProjects()

  return (
    <SimpleLayout
      title="PROJECTS"
      intro="대표적인 프로젝트와 문제를 해결하고, 새로운 기술을 탐구하는 과정에서 얻은 경험과 지식을 공유합니다."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {projects.map((project) => (
            <Project key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
