"use client";

import { useGetTodaySchedulesByDoctor } from "@/hooks";
import DoctorBooking from "./doctor-booking";

export default function PublicDoctorSchedules({
  doctorId,
}: {
  doctorId: string;
}) {
  const { data, isPending, isError } = useGetTodaySchedulesByDoctor({ doctorId });

  if (isPending) return <p>Loading today&apos;s schedules...</p>;
  if (isError) return <p>Could not load schedules.</p>;

  const schedules = data.data;
  if (!schedules.length) return <p>No schedules available today.</p>;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Today&apos;s schedules</h2>
      {schedules.map((s) => (
        <div
          key={s.id}
          className="flex items-center justify-between rounded border p-3"
        >
          <span>
            {new Date(s.startDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            {" - "}
            {new Date(s.endDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            {" · "}
            {s.availableSlots} slots left
          </span>
          <DoctorBooking
            scheduleId={s.id}
            disabled={s.availableSlots === 0 || new Date(s.startDateTime) <= new Date()}
          />
        </div>
      ))}
    </div>
  );
}
