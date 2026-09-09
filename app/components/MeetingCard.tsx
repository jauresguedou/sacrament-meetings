import Link from "next/link";

import type { SacramentMeeting } from "../lib/types";

type MeetingCardProps = {
  meeting: SacramentMeeting;
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const meetingDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(meeting.date));

  const meetingTypeLabel = meeting.meetingType
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="block rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {meetingTypeLabel}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            {meetingDate}
          </h3>
        </div>

        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
          #{meeting.id}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p>
          <span className="font-medium text-slate-800">Presiding:</span> {meeting.presiding}
        </p>
        <p>
          <span className="font-medium text-slate-800">Conducting:</span> {meeting.conducting}
        </p>
        <p>
          <span className="font-medium text-slate-800">Opening hymn:</span> {meeting.openingHymn.number} - {meeting.openingHymn.title}
        </p>
      </div>
    </Link>
  );
}