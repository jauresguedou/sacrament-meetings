export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 text-sm text-slate-600">
        <p>Ward sacrament meeting planner</p>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
