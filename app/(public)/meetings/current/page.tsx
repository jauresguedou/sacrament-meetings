import { redirect } from "next/navigation";

import { getMeetings } from "../../../lib/meetings-db";

export default async function CurrentMeetingPage() {
  const meetings = await getMeetings();
  const currentMeeting = meetings[0];

  if (!currentMeeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${currentMeeting.id}`);
}
