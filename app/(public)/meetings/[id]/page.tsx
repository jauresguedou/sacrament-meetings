import { notFound } from "next/navigation";

import MeetingDetail from "../../../components/MeetingDetail";
import { getMeetingById } from "../../../lib/meetings-db";
import type { SacramentMeeting } from "../../../lib/types";

export const dynamic = "force-dynamic";

type MeetingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MeetingDetailPage({ params }: MeetingPageProps) {
  const { id } = await params;

  const numericId = Number(id);
  if (!Number.isInteger(numericId)) {
    notFound();
  }

  const meeting: SacramentMeeting | null = await getMeetingById(numericId);
  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}
