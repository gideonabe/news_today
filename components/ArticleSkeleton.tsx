import { Skeleton } from "./ui/skeleton";

const ArticlesSkeleton = () => {
  return (
    <div className="space-y-10 container-content">
      {/* Featured Article Skeleton */}
      <div className="relative h-100 md:h-120 bg-gray-900 text-white rounded-lg overflow-hidden">
        <Skeleton className="w-full h-full rounded-lg bg-gray-300" />
      </div>

      {/* Recent Articles Skeleton */}
      <div className="flex flex-col gap-4">
        <div className="h-8 w-48 bg-gray-300 rounded-md mb-4"></div>
        <div className="grid-articles">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-48 w-full rounded-lg bg-gray-300" />
              <Skeleton className="h-4 w-3/4 bg-gray-300" />
              <Skeleton className="h-3 w-full bg-gray-300" />
              <Skeleton className="h-3 w-5/6 bg-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesSkeleton;
