import { redirect } from "next/navigation";

import { getMeetings } from "../../../lib/meetings-db";

function getUpcomingSundayDate() {
  const sunday = new Date();
  const daysUntilSunday = (7 - sunday.getDay()) % 7;
  sunday.setDate(sunday.getDate() + daysUntilSunday);

  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, "0");
  const day = String(sunday.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default async function CurrentMeetingPage() {
  const meetings = await getMeetings("", 1, getUpcomingSundayDate());
  const currentMeeting = meetings[0];

  if (!currentMeeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${currentMeeting.id}`);
}
