import glob from 'fast-glob'

interface Article {
  title: string
  description: string
  author: string
  date: string
}

export interface ArticleWithSlug extends Article {
  slug: string
}

export interface PaperWithSlug extends ArticleWithSlug {
  /** e.g. '한국정보통신학회논문지 Vol.25 No.9, pp.1135–1143' */
  venue: string
  /** Link to the original paper (KCI, ScienceON, dCollection ...) */
  url: string
}

function toSlug(filename: string) {
  return filename.replace(/(\/page)?\.mdx$/, '')
}

function sortByDateDesc<T extends { date: string }>(items: T[]) {
  return items.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}

async function importEssay(filename: string): Promise<ArticleWithSlug> {
  let { article } = (await import(`../app/essays/${filename}`)) as {
    article: Article
  }
  return { slug: toSlug(filename), ...article }
}

async function importPaper(filename: string): Promise<PaperWithSlug> {
  let { article } = (await import(`../app/papers/${filename}`)) as {
    article: Omit<PaperWithSlug, 'slug'>
  }
  return { slug: toSlug(filename), ...article }
}

/** Essays under src/app/essays */
export async function getAllEssays() {
  let filenames = await glob('*/page.mdx', { cwd: './src/app/essays' })
  return sortByDateDesc(await Promise.all(filenames.map(importEssay)))
}

/** Papers under src/app/papers */
export async function getAllPapers() {
  let filenames = await glob('*/page.mdx', { cwd: './src/app/papers' })
  return sortByDateDesc(await Promise.all(filenames.map(importPaper)))
}
