import glob from 'fast-glob'

interface Project {
  title: string
  description: string
  author: string
  date: string
  /** 'YYYY-MM'. When present, the list shows a period instead of `date`. */
  startDate?: string
  /** 'YYYY-MM'. Omit for an ongoing project. */
  endDate?: string
  /** Main tech stack, shown as tags in the list */
  stack?: string[]
}

export interface ProjectWithSlug extends Project {
  slug: string
}

async function importProject(projectFilename: string): Promise<ProjectWithSlug> {
  let { project } = (await import(`../app/projects/${projectFilename}`)) as {
    default: React.ComponentType
    project: Project
  }

  return {
    slug: projectFilename.replace(/(\/page)?\.mdx$/, ''),
    ...project,
  }
}

/** Most recent first: ongoing projects, then by end date, falling back to `date`. */
function sortKey(project: Project) {
  if (project.startDate && !project.endDate) return Infinity
  return +new Date(project.endDate ?? project.date)
}

export async function getAllProjects() {
  let projectFilenames = await glob('*/page.mdx', {
    cwd: './src/app/projects',
  })

  let projects = await Promise.all(projectFilenames.map(importProject))

  return projects.sort(
    (a, z) =>
      sortKey(z) - sortKey(a) ||
      +new Date(z.startDate ?? z.date) - +new Date(a.startDate ?? a.date),
  )
}
