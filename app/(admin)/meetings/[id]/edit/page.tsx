'use client';

import { use, useActionState, useEffect, useState } from "react";
import Link from "next/link";

import { updateMeeting } from "../../../../lib/actions";
import type { State, SacramentMeeting } from "../../../../lib/types";

type EditMeetingPageProps = {
  params: Promise<{ id: string }>;
};

const initialState: State = {};

export default function EditMeetingPage({ params }: EditMeetingPageProps) {
  const { id } = use(params);
  const numericId = Number(id);
  const invalidId = !Number.isInteger(numericId);
  const [meeting, setMeeting] = useState<SacramentMeeting | null>(null);
  const [loadError, setLoadError] = useState(false);
  const updateMeetingAction = updateMeeting.bind(null, numericId);
  const [state, formAction, isPending] = useActionState(updateMeetingAction, initialState);

  useEffect(() => {
    if (invalidId) {
      return;
    }

    let cancelled = false;
    fetch(`/api/meetings/${numericId}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Meeting not found");
        }
        return response.json() as Promise<SacramentMeeting>;
      })
      .then((data) => {
        if (!cancelled) {
          setMeeting(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [invalidId, numericId]);

  if (invalidId || loadError) {
    return (
      <div className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Meeting not found</h1>
        <p className="mt-3 text-slate-600">The meeting you are trying to edit does not exist.</p>
        <Link href="/meetings" className="mt-6 inline-flex rounded-md bg-slate-900 px-4 py-2 font-medium text-white">
          Back to Meetings
        </Link>
      </div>
    );
  }

  if (!meeting) {
    return <p className="mx-auto max-w-3xl p-6 text-slate-600">Loading meeting...</p>;
  }

  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">Edit meeting</h1>
      <form action={formAction} noValidate className="mt-6 grid gap-5">
        <div id="edit-meeting-form-error" aria-live="polite" className="text-sm text-red-700">
          {state.message}
        </div>

        <label htmlFor="edit-meeting-date" className="grid gap-2 text-sm font-medium text-slate-700">
          Date
          <input id="edit-meeting-date" name="date" type="date" defaultValue={meeting.date} required aria-describedby="edit-meeting-date-error" className="rounded-md border border-slate-300 px-3 py-2" />
          <div id="edit-meeting-date-error" aria-live="polite">{state.errors?.date?.join(" ")}</div>
        </label>

        <label htmlFor="edit-meeting-type" className="grid gap-2 text-sm font-medium text-slate-700">
          Meeting type
          <select id="edit-meeting-type" name="meetingType" defaultValue={meeting.meetingType} aria-describedby="edit-meeting-type-error" className="rounded-md border border-slate-300 px-3 py-2">
            <option value="testimony">Testimony</option>
            <option value="regular">Regular</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          <div id="edit-meeting-type-error" aria-live="polite">{state.errors?.meetingType?.join(" ")}</div>
        </label>

        <label htmlFor="edit-meeting-presiding" className="grid gap-2 text-sm font-medium text-slate-700">
          Presiding
          <input id="edit-meeting-presiding" name="presiding" defaultValue={meeting.presiding} required aria-describedby="edit-meeting-presiding-error" className="rounded-md border border-slate-300 px-3 py-2" />
          <div id="edit-meeting-presiding-error" aria-live="polite">{state.errors?.presiding?.join(" ")}</div>
        </label>

        <label htmlFor="edit-meeting-conducting" className="grid gap-2 text-sm font-medium text-slate-700">
          Conducting
          <input id="edit-meeting-conducting" name="conducting" defaultValue={meeting.conducting} aria-describedby="edit-meeting-conducting-error" className="rounded-md border border-slate-300 px-3 py-2" />
          <div id="edit-meeting-conducting-error" aria-live="polite">{state.errors?.conducting?.join(" ")}</div>
        </label>

        <label htmlFor="edit-meeting-stake-business" className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input id="edit-meeting-stake-business" name="stakeBusiness" type="checkbox" value="true" defaultChecked={meeting.stakeBusiness} aria-describedby="edit-meeting-stake-business-error" />
          Stake business
          <div id="edit-meeting-stake-business-error" aria-live="polite">{state.errors?.stakeBusiness?.join(" ")}</div>
        </label>

        <button type="submit" disabled={isPending} className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60">
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}
