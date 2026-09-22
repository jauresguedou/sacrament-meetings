export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Meetings
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">Agenda Hub</h2>
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}
