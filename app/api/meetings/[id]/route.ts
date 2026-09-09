import { getMeetingById } from "../../../lib/meetings-db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    return Response.json(
      { error: "Meeting ID must be a valid number." },
      { status: 400 },
    );
  }

  const meeting = getMeetingById(numericId);

  if (!meeting) {
    return Response.json(
      { error: `No meeting found for ID ${numericId}.` },
      { status: 404 },
    );
  }

  return Response.json(meeting, { status: 200 });
}
