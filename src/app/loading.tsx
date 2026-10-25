export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10" aria-busy="true" aria-label="সংবাদ লোড হচ্ছে">
      <div className="mb-7 border-b-2 border-ink pb-2">
        <div className="h-8 w-40 animate-pulse bg-paper-deep" />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="aspect-[16/10] w-full animate-pulse bg-paper-deep" />
              <div className="mt-4 h-4 w-24 animate-pulse bg-paper-deep" />
              <div className="mt-3 h-8 w-full animate-pulse bg-paper-deep" />
              <div className="mt-2 h-8 w-4/5 animate-pulse bg-paper-deep" />
            </div>
            <div className="space-y-4 lg:col-span-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="border-b border-rule pb-4">
                  <div className="h-3 w-16 animate-pulse bg-paper-deep" />
                  <div className="mt-2 h-5 w-full animate-pulse bg-paper-deep" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t-4 border-double border-ink pt-4">
          <div className="h-6 w-32 animate-pulse bg-paper-deep" />
          <div className="mt-4 space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-5 w-full animate-pulse bg-paper-deep" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
