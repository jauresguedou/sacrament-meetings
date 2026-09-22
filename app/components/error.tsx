'use client';

import Link from 'next/link';

type MeetingsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function MeetingsError({ reset }: MeetingsErrorProps) {
  return (
    <div className="mx-auto max-w-xl rounded-xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
        Meetings unavailable
      </p>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">
        We could not load the meetings.
      </h1>
      <p className="mt-3 text-slate-600">
        Something went wrong while loading this page. Try again or return to the meetings list.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-700"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}
