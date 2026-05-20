interface PageLoadingProps {
  label: string;
}

export function PageLoading({ label }: PageLoadingProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-2 w-2 animate-pulse rounded-full bg-foreground" />
        <span>{label}</span>
      </div>

      <div className="mb-10 space-y-3">
        <div className="h-10 w-40 animate-pulse rounded-none bg-muted" />
        <div className="h-4 w-full max-w-xl animate-pulse rounded-none bg-muted" />
        <div className="h-4 w-full max-w-md animate-pulse rounded-none bg-muted" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="border border-border bg-muted/10 p-4">
            <div className="h-4 w-24 animate-pulse rounded-none bg-muted" />
            <div className="mt-4 h-6 w-3/4 animate-pulse rounded-none bg-muted" />
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full animate-pulse rounded-none bg-muted" />
              <div className="h-3 w-5/6 animate-pulse rounded-none bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}