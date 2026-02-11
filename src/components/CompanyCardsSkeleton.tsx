import { Skeleton } from "./ui/skeleton";

export function CompanyCardsSkeleton() {
  return (
    <div className="bg-background rounded-2xl sm:rounded-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pt-2 sm:pt-3 gap-3 sm:gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="group relative flex flex-col items-center p-2 sm:p-3 rounded-xl sm:rounded-2xl border"
        >
          {/* Avatar skeleton */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 mb-2 sm:mb-3 rounded-full p-0.5 border-2 border-white/20 ring-2 ring-background/50">
            <Skeleton className="w-full h-full rounded-full" />
          </div>

          {/* Company Name skeleton */}
          <Skeleton className="h-4 sm:h-5 w-20 sm:w-24 mb-1" />

          {/* Industry Badge skeleton */}
          <Skeleton className="h-4 sm:h-5 w-14 sm:w-16 rounded-full mb-2" />

          {/* Description skeleton */}
          <div className="min-h-[1.5rem] sm:min-h-[2rem] flex items-center mb-2 sm:mb-3 w-full px-1">
            <div className="space-y-1 w-full">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>

          {/* Stats Grid skeleton */}
          <div className="w-full grid grid-cols-2 gap-1 sm:gap-2 mb-2 sm:mb-3 p-1 sm:p-2 rounded-lg sm:rounded-xl">
            {Array.from({ length: 4 }).map((_, statIndex) => (
              <div
                key={statIndex}
                className="flex flex-col items-center text-center space-y-1"
              >
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-2 w-10 sm:w-12" />
                <Skeleton className="h-3 w-6 sm:w-8" />
              </div>
            ))}
          </div>

          {/* Action Button skeleton */}
          <Skeleton className="h-6 sm:h-8 w-16 sm:w-24 rounded-full" />

          {/* Background gradient effect skeleton */}
          <div className="m-2 sm:m-3 absolute inset-0 rounded-xl sm:rounded-2xl -z-10 bg-muted/20" />
        </div>
      ))}
    </div>
  );
}
