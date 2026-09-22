import Link from "next/link";

export default function EditMeetingNotFound() {
	return (
		<div className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
			<h1 className="text-2xl font-bold text-slate-900">Meeting not found</h1>
			<p className="mt-3 text-slate-600">
				The meeting you are trying to edit does not exist or may have been removed.
			</p>
			<Link
				href="/meetings"
				className="mt-6 inline-flex rounded-md bg-slate-900 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-700"
			>
				Back to Meetings
			</Link>
		</div>
	);
}
