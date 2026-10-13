import z from "zod";

const MINIMUM_SLOT_MINUTES = 20;

// e.g. https://meet.google.com/abc-defg-hij (optional ?query like ?authuser=0)
const GOOGLE_MEET_REGEX =
  /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}(\?.*)?$/;

function slotMinutes(startTime: string, endTime: string) {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  return endHour * 60 + endMinute - (startHour * 60 + startMinute);
}
export const scheduleSchema = z
  .object({
    date: z.string().min(1, "Date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    // backend requires a meeting link
    meetingLink: z.string().trim().min(1,"Meeting Link is required ").regex(GOOGLE_MEET_REGEX, "Meeting Link must be a valid Google Meet URL"),
  })
  // also rejects end <= start, since the difference is then <= 0
  .refine((v) => slotMinutes(v.startTime, v.endTime) >= MINIMUM_SLOT_MINUTES, {
    message: `Time range must be at least ${MINIMUM_SLOT_MINUTES} minutes`,
    path: ["endTime"],
  });
