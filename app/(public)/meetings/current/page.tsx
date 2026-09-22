import { redirect } from "next/navigation";

import { getMeetings } from "../../../lib/meetings-db";

function getCurrentSundayDate() {
  const sunday = new Date();
  sunday.setDate(sunday.getDate() - sunday.getDay());

  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, "0");
  const day = String(sunday.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default async function CurrentMeetingPage() {
  const meetings = await getMeetings("", 1, getCurrentSundayDate());
  const currentMeeting = meetings[0];

  if (!currentMeeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${currentMeeting.id}`);
}
