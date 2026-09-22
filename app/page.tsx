import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 px-6 py-10">
      <section className="grid w-full gap-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:grid-cols-[1.1fr_0.9fr] md:p-10">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Sacrament meeting
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            Stay prepared for every ward meeting.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            Review the agenda, speaker list, hymns, and meeting details in one place.
          </p>
          <Link
            href="/meetings/new"
            className="mt-6 inline-flex w-fit rounded-md bg-slate-900 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-700"
          >
            Create new meeting
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src="/next.svg"
            alt="Sacrament meeting illustration"
            width={640}
            height={420}
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </section>
    </main>
  );
}
