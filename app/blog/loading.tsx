export default function Loading() {
  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="mb-8 space-y-3">
        <div className="h-10 w-32 animate-pulse rounded-none bg-muted" />
        <div className="h-4 w-full max-w-md animate-pulse rounded-none bg-muted" />
      </div>

      <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-2 w-2 animate-pulse rounded-full bg-foreground" />
        <span>Loading blog posts...</span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="border border-border bg-muted/10">
            <div className="h-40 animate-pulse bg-muted/70" />
            <div className="space-y-3 p-4">
              <div className="h-3 w-24 animate-pulse rounded-none bg-muted" />
              <div className="h-5 w-3/4 animate-pulse rounded-none bg-muted" />
              <div className="h-3 w-full animate-pulse rounded-none bg-muted" />
              <div className="h-3 w-5/6 animate-pulse rounded-none bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}