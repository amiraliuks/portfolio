interface ArticleLoadingProps {
  label: string;
}

export function ArticleLoading({ label }: ArticleLoadingProps) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-2 w-2 animate-pulse rounded-full bg-foreground" />
        <span>{label}</span>
      </div>

      <div className="space-y-5">
        <div className="h-4 w-28 animate-pulse rounded-none bg-muted" />
        <div className="space-y-3">
          <div className="h-9 w-full max-w-2xl animate-pulse rounded-none bg-muted" />
          <div className="h-9 w-3/4 max-w-xl animate-pulse rounded-none bg-muted" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-20 animate-pulse rounded-none bg-muted" />
          <div className="h-6 w-24 animate-pulse rounded-none bg-muted" />
          <div className="h-6 w-16 animate-pulse rounded-none bg-muted" />
        </div>
      </div>

      <div className="mt-8 aspect-16/7 w-full animate-pulse rounded-none border border-border bg-muted/60" />

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="space-y-4">
          <div className="h-4 w-full animate-pulse rounded-none bg-muted" />
          <div className="h-4 w-[92%] animate-pulse rounded-none bg-muted" />
          <div className="h-4 w-[86%] animate-pulse rounded-none bg-muted" />
          <div className="h-4 w-[95%] animate-pulse rounded-none bg-muted" />
          <div className="h-4 w-[72%] animate-pulse rounded-none bg-muted" />
          <div className="pt-4">
            <div className="h-7 w-56 animate-pulse rounded-none bg-muted" />
          </div>
          <div className="h-4 w-full animate-pulse rounded-none bg-muted" />
          <div className="h-4 w-[88%] animate-pulse rounded-none bg-muted" />
          <div className="h-4 w-[78%] animate-pulse rounded-none bg-muted" />
        </div>

        <aside className="hidden space-y-3 lg:block">
          <div className="h-4 w-28 animate-pulse rounded-none bg-muted" />
          <div className="h-3 w-40 animate-pulse rounded-none bg-muted" />
          <div className="h-3 w-32 animate-pulse rounded-none bg-muted" />
          <div className="h-3 w-36 animate-pulse rounded-none bg-muted" />
        </aside>
      </div>
    </main>
  );
}