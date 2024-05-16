import { cn } from '~/utils/cn'

type SectionHeadingProps = {
  className?: string
  children: React.ReactNode
}

const SectionHeading = ({ className, children }: SectionHeadingProps) => {
  return <h1 className={cn('font-semibold capitalize sm:text-lg lg:text-xl', className)}>{children}</h1>
}

export default SectionHeading
