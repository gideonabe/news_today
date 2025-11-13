import React from 'react'
import Navbar from './Navbar2'
import { Skeleton } from './ui/skeleton'

const ArticleDetailsSkeleton = () => {
  return (
    <section>
      <Navbar />
      <div className="max-w-[95%] md:max-w-[75%] mx-auto mt-4 md:mt-8 space-y-6">

        {/* Breadcrumb */}
        <Skeleton className="h-4 w-1/4 md:w-1/6" />

        {/* Title & Author */}
        <Skeleton className="h-10 md:h-16 w-3/4 md:w-1/2" />
        <Skeleton className="h-4 w-1/3 md:w-1/4" />

        {/* Main Image */}
        <Skeleton className="h-80 md:h-112 w-full rounded-lg" />

        {/* Content */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-3/6" />
        </div>

        {/* Features */}
        <div className="flex justify-around mt-4">
          {[...Array(4)].map((_, idx) => (
            <Skeleton key={idx} className="h-6 w-16 md:w-20 rounded" />
          ))}
        </div>

        {/* Related Articles */}
        <div className="mt-10">
          <Skeleton className="h-6 md:h-8 w-1/3 mb-4" />
          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-1 flex flex-col space-y-2">
                  <Skeleton className="h-3 w-1/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
                <Skeleton className="w-[35%] h-24 md:h-32 rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div className="mt-10 space-y-4">
          <Skeleton className="h-6 md:h-8 w-1/4" />
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex gap-2 items-start">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
          ))}

          {/* Comment input */}
          <div className="flex gap-3 items-start">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
          <Skeleton className="h-10 w-32 rounded-lg self-end" />
        </div>

      </div>
    </section>
  )
}

export default ArticleDetailsSkeleton