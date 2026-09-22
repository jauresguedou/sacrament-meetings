import Link from "next/link";
import type { SacramentMeeting } from "../lib/types";

type MeetingDetailProps = {
  meeting: SacramentMeeting;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const formatMeetingType = (value: SacramentMeeting["meetingType"]) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <article className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="border-b border-slate-200 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {formatMeetingType(meeting.meetingType)} Meeting
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          {formatDate(meeting.date)}
        </h1>
      </header>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Leadership
          </h2>
          <dl className="mt-3 space-y-2 text-sm text-slate-700">
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-slate-900">Presiding</dt>
              <dd>{meeting.presiding}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-slate-900">Conducting</dt>
              <dd>{meeting.conducting}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-slate-900">Stake business</dt>
              <dd>{meeting.stakeBusiness ? "Yes" : "No"}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg bg-slate-50 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Announcements
          </h2>
          {meeting.announcements && meeting.announcements.length > 0 ? (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {meeting.announcements.map((announcement) => (
                <li key={announcement}>{announcement}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-500">No announcements.</p>
          )}
        </div>
      </div>

      <section className="mt-8 space-y-6">
        <div className="rounded-lg border border-slate-200 p-4">
          <h2 className="text-lg font-semibold text-slate-900">Hymns & Prayers</h2>
          <dl className="mt-3 space-y-3 text-sm text-slate-700">
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-slate-900">Opening hymn</dt>
              <dd>
                #{meeting.openingHymn.number} — {meeting.openingHymn.title}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-slate-900">Opening prayer</dt>
              <dd>{meeting.openingPrayer}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-slate-900">Sacrament hymn</dt>
              <dd>
                #{meeting.sacramentHymn.number} — {meeting.sacramentHymn.title}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-slate-900">Closing hymn</dt>
              <dd>
                #{meeting.closingHymn.number} — {meeting.closingHymn.title}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-slate-900">Closing prayer</dt>
              <dd>{meeting.closingPrayer}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <h2 className="text-lg font-semibold text-slate-900">Ward Business</h2>
          {meeting.wardBusiness.length > 0 ? (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {meeting.wardBusiness.map((item, index) => (
                <li key={`${item.description}-${index}`}>{item.description}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-500">No ward business.</p>
          )}
        </div>

        <div className="rounded-lg border border-slate-200 p-4">
          <h2 className="text-lg font-semibold text-slate-900">Speakers</h2>
          {meeting.speakers.length > 0 ? (
            <ul className="mt-3 space-y-3 text-sm text-slate-700">
              {meeting.speakers.map((speaker, index) => (
                <li key={`${speaker.name}-${index}`} className="rounded-md bg-slate-50 p-3">
                  <p className="font-medium text-slate-900">{speaker.name}</p>
                  {speaker.type === "speaker" ? (
                    <p className="mt-1">{speaker.topic || "No topic provided"}</p>
                  ) : (
                    <p className="mt-1 italic text-slate-600">Musical number</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-500">No speakers listed.</p>
          )}
        </div>
      </section>

      <div className="mt-8 flex justify-end border-t border-slate-200 pt-6">
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-700"
        >
          Update meeting
        </Link>
      </div>
    </article>
  );
}
