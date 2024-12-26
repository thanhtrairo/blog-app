import { Skeleton } from '~/components/ui/skeleton'

type CardsLoadingProps = {
  count?: number
}

const DEFAULT_COUNT = 3

export const CardsLoading = ({ count = DEFAULT_COUNT }: CardsLoadingProps) => {
  const arrayCards = Array.from({ length: count }, (_, i) => i + 1)

  return (
    <>
      {arrayCards.map((card) => (
        <div key={card} className="flex items-center gap-12">
          <Skeleton className="h-64 max-sm:hidden sm:w-1/2 lg:w-1/3" />
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex items-center gap-1">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <Skeleton className="w-50 h-8" />
            <Skeleton className="w-50 h-6" />
            <Skeleton className="w-50 h-6" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      ))}
    </>
  )
}
