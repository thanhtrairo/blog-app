import { cn } from '~/libs/utils'

type SectionHeadingProps = {
  className?: string
  children: React.ReactNode
}

export const SectionHeading = ({ className, children }: SectionHeadingProps) => {
  return <h1 className={cn('font-semibold capitalize sm:text-lg lg:text-xl', className)}>{children}</h1>
}
