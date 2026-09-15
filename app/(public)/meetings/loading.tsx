export default function Loading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading meetings">
      <div className="flex items-center justify-between">
        <div className="h-9 w-48 animate-pulse rounded-md bg-slate-200" />
        <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200" />
      </div>

      <div className="grid gap-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                <div className="h-7 w-36 animate-pulse rounded bg-slate-200" />
              </div>
              <div className="h-6 w-12 animate-pulse rounded-full bg-slate-200" />
            </div>

            <div className="mt-5 space-y-3">
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
