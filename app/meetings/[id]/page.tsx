import { notFound } from "next/navigation";

import MeetingDetail from "../../components/MeetingDetail";
import type { SacramentMeeting } from "../../lib/types";

export const dynamic = "force-dynamic";

type MeetingPageProps = {
  params: Promise<{ id: string }>;
};

async function getMeeting(id: string): Promise<SacramentMeeting> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/meetings/${id}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch meeting");
  }

  return response.json();
}

export default async function MeetingDetailPage({ params }: MeetingPageProps) {
  const { id } = await params;

  let meeting: SacramentMeeting;

  try {
    meeting = await getMeeting(id);
  } catch {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}
