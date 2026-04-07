import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { GitHubIcon, InstagramIcon, LinkedInIcon, XIcon } from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description: 'I’m Spencer Sharp. I live in New York City, where I design the future.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            미래지향적인 소프트웨어를 설계하고 개발합니다.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              저는 복잡한 비즈니스 문제를 시스템 아키텍처와 데이터를 활용해 해결하는 데 강점을 가진
              개발자입니다. 기술에 얽매이지 않고 문제의 본질을 파악하여, 실질적인 비즈니스 가치를
              창출하는 최적의 솔루션을 설계하고 구현합니다.
            </p>
            <p>
              저의 핵심 역량은 비즈니스 문제를 근본적으로 해결하는 견고한 시스템 설계와 개발입니다.
              실제로 모놀리식 구조의 빅데이터 플랫폼을 MSA(Microservices Architecture)로 재설계하여
              시스템 리소스 점유율을 획기적으로 절감하고, 만성적인 데이터 수집 병목 현상을 완전히
              해소했습니다. 또한 AI/ML 기반 추천 시스템을 자체 개발하여 공정 레시피 설계 시간을 대폭
              단축했습니다.
            </p>
            <p>
              스마트 팩토리·물류 분야에서는 물류 적치 알고리즘을 고도화하여 Gantry 설비의 동시 운영
              역량을 확대함으로써 설비 가동률을 극대화했습니다. 아울러 물류 현장에 최적화된 관제
              시스템을 성공적으로 도입해 전체 운영 프로세스의 효율성을 한 단계 끌어올렸으며, 타이어
              공장 생산 제어 시스템을 설계·구축하여 생산 라인의 실시간 모니터링과 제어를 가능하게
              함으로써 생산 효율성 향상에 기여했습니다.
            </p>
            <p>
              C#, Java/Spring, Python, Node.js/Next.js 등 폭넓은 기술 스택을 바탕으로, 트래픽이
              폭주하는 환경에서도 중단 없는 고가용성(High Availability)을 보장하는 안정적인 분산
              처리 시스템을 구축·운영해 왔습니다.
            </p>
            <p>
              이러한 실무 경험을 바탕으로, 비즈니스에 실질적인 가치를 더하는 고효율 시스템을
              설계하고 프로젝트를 반드시 성공으로 이끌겠습니다.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            {/* <SocialLink href="#" icon={XIcon}>
              Follow on X
            </SocialLink> */}
            <SocialLink
              href="https://www.instagram.com/zinhwan.kim/"
              icon={InstagramIcon}
              className="mt-4"
            >
              Follow on Instagram
            </SocialLink>
            <SocialLink href="https://github.com/cerulean85" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/zin-hwan-kim-299a86155"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:zhwan85@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              zhwan85@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
