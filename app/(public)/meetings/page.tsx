import MeetingCard from "../../components/MeetingCard";
import { MeetingSearch } from "../../components/MeetingSearch";
import { Pagination } from "../../components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "../../lib/meetings-db";

export const dynamic = "force-dynamic";

type MeetingsSearchParams = {
  query?: string;
  page?: string;
  date?: string;
};

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<MeetingsSearchParams>;
}) {
  const { query = "", page = "1", date } = await searchParams;
  const currentPage = Math.max(1, Number.parseInt(page, 10) || 1);
  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage, date),
    getMeetingsTotalPages(query, date),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">All Meetings</h1>
        <MeetingSearch />
      </div>

      <div className="grid gap-5">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>

      <Pagination totalPages={totalPages} />
    </div>
  );
}
