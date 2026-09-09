import { redirect } from "next/navigation";

import { getMeetings } from "../../lib/meetings-db";

export default function CurrentMeetingPage() {
  const meetings = getMeetings();
  const currentMeeting = meetings[0];

  if (!currentMeeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${currentMeeting.id}`);
}
