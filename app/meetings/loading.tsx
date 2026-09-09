export default function Loading() {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3 text-slate-600">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
        <span className="text-sm font-medium">Loading meetings...</span>
      </div>
    </div>
  );
}
