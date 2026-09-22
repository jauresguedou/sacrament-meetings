'use client';

import { useActionState } from "react";

import { createMeeting } from "../../../lib/actions";
import type { State } from "../../../lib/types";

const initialState: State = {};

export default function NewMeetingPage() {
  const [state, formAction, isPending] = useActionState(createMeeting, initialState);

  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">Create meeting</h1>
      <form action={formAction} noValidate className="mt-6 grid gap-5">
        <div id="new-meeting-form-error" aria-live="polite" className="text-sm text-red-700">
          {state.message}
        </div>
        <label htmlFor="new-meeting-date" className="grid gap-2 text-sm font-medium text-slate-700">
          Date
          <input id="new-meeting-date" name="date" type="date" required aria-describedby="new-meeting-date-error" className="rounded-md border border-slate-300 px-3 py-2" />
          <div id="new-meeting-date-error" aria-live="polite">{state.errors?.date?.join(" ")}</div>
        </label>

        <label htmlFor="new-meeting-type" className="grid gap-2 text-sm font-medium text-slate-700">
          Meeting type
          <select id="new-meeting-type" name="meetingType" defaultValue="regular" aria-describedby="new-meeting-type-error" className="rounded-md border border-slate-300 px-3 py-2">
            <option value="testimony">Testimony</option>
            <option value="regular">Regular</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          <div id="new-meeting-type-error" aria-live="polite">{state.errors?.meetingType?.join(" ")}</div>
        </label>

        <label htmlFor="new-meeting-presiding" className="grid gap-2 text-sm font-medium text-slate-700">
          Presiding
          <input id="new-meeting-presiding" name="presiding" required aria-describedby="new-meeting-presiding-error" className="rounded-md border border-slate-300 px-3 py-2" />
          <div id="new-meeting-presiding-error" aria-live="polite">{state.errors?.presiding?.join(" ")}</div>
        </label>

        <label htmlFor="new-meeting-conducting" className="grid gap-2 text-sm font-medium text-slate-700">
          Conducting
          <input id="new-meeting-conducting" name="conducting" aria-describedby="new-meeting-conducting-error" className="rounded-md border border-slate-300 px-3 py-2" />
          <div id="new-meeting-conducting-error" aria-live="polite">{state.errors?.conducting?.join(" ")}</div>
        </label>

        <label htmlFor="new-meeting-stake-business" className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input id="new-meeting-stake-business" name="stakeBusiness" type="checkbox" value="true" aria-describedby="new-meeting-stake-business-error" />
          Stake business
          <div id="new-meeting-stake-business-error" aria-live="polite">{state.errors?.stakeBusiness?.join(" ")}</div>
        </label>

        <label htmlFor="new-meeting-announcements" className="sr-only">Announcements</label>
        <input id="new-meeting-announcements" type="hidden" name="announcements" value="[]" aria-describedby="new-meeting-announcements-error" />
        <div id="new-meeting-announcements-error" aria-live="polite">{state.errors?.announcements?.join(" ")}</div>
        <label htmlFor="new-meeting-opening-hymn" className="sr-only">Opening hymn</label>
        <input id="new-meeting-opening-hymn" type="hidden" name="openingHymn" value={JSON.stringify({ number: 0, title: "Opening hymn" })} aria-describedby="new-meeting-opening-hymn-error" />
        <div id="new-meeting-opening-hymn-error" aria-live="polite">{state.errors?.openingHymn?.join(" ")}</div>
        <label htmlFor="new-meeting-opening-prayer" className="sr-only">Opening prayer</label>
        <input id="new-meeting-opening-prayer" type="hidden" name="openingPrayer" value="" aria-describedby="new-meeting-opening-prayer-error" />
        <div id="new-meeting-opening-prayer-error" aria-live="polite">{state.errors?.openingPrayer?.join(" ")}</div>
        <label htmlFor="new-meeting-ward-business" className="sr-only">Ward business</label>
        <input id="new-meeting-ward-business" type="hidden" name="wardBusiness" value="[]" aria-describedby="new-meeting-ward-business-error" />
        <div id="new-meeting-ward-business-error" aria-live="polite">{state.errors?.wardBusiness?.join(" ")}</div>
        <label htmlFor="new-meeting-sacrament-hymn" className="sr-only">Sacrament hymn</label>
        <input id="new-meeting-sacrament-hymn" type="hidden" name="sacramentHymn" value={JSON.stringify({ number: 0, title: "Sacrament hymn" })} aria-describedby="new-meeting-sacrament-hymn-error" />
        <div id="new-meeting-sacrament-hymn-error" aria-live="polite">{state.errors?.sacramentHymn?.join(" ")}</div>
        <label htmlFor="new-meeting-speakers" className="sr-only">Speakers</label>
        <input id="new-meeting-speakers" type="hidden" name="speakers" value="[]" aria-describedby="new-meeting-speakers-error" />
        <div id="new-meeting-speakers-error" aria-live="polite">{state.errors?.speakers?.join(" ")}</div>
        <label htmlFor="new-meeting-closing-hymn" className="sr-only">Closing hymn</label>
        <input id="new-meeting-closing-hymn" type="hidden" name="closingHymn" value={JSON.stringify({ number: 0, title: "Closing hymn" })} aria-describedby="new-meeting-closing-hymn-error" />
        <div id="new-meeting-closing-hymn-error" aria-live="polite">{state.errors?.closingHymn?.join(" ")}</div>
        <label htmlFor="new-meeting-closing-prayer" className="sr-only">Closing prayer</label>
        <input id="new-meeting-closing-prayer" type="hidden" name="closingPrayer" value="" aria-describedby="new-meeting-closing-prayer-error" />
        <div id="new-meeting-closing-prayer-error" aria-live="polite">{state.errors?.closingPrayer?.join(" ")}</div>

        <button type="submit" disabled={isPending} className="rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60">
          {isPending ? "Creating..." : "Create meeting"}
        </button>
      </form>
    </div>
  );
}
