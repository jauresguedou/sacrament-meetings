import NavLinks from "./NavLinks";

export default function Header() {
    const today = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date());

    return (
        <header className="w-full border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
            <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Ward
                    </p>
                    <h2 className="text-2xl font-bold text-slate-900">Ward Name</h2>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <p className="text-sm font-medium text-slate-600">{today}</p>
                    <NavLinks />
                </div>
            </div>
        </header>
    );
}