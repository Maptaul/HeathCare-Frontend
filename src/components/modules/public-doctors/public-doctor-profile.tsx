"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublicDoctorProfile } from "@/hooks";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString(undefined, { timeStyle: "short" });

export default function PublicDoctorProfile() {
  const doctorId = useSearchParams().get("id") ?? "";
  const { data, isPending, isError, error } =
    useGetPublicDoctorProfile(doctorId);

  if (!doctorId) {
    return (
      <Link href="/doctors" className="underline">
        No doctor selected. Browse all doctors
      </Link>
    );
  }

  if (isPending) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-2">
        <p role="alert" className="text-destructive">
          {error.message.includes("404") ? "Doctor not found." : error.message}
        </p>
        <Link href="/doctors" className="underline">
          Back to all doctors
        </Link>
      </div>
    );
  }

  const doctor = data.data;

  return (
    <div className="flex flex-col gap-6">
      <Link href="/doctors" className="text-sm underline">
        ← All doctors
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{doctor.name}</CardTitle>
          <CardDescription>{doctor.specialization}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <span>Qualifications: {doctor.qualifications}</span>
          <span>Experience: {doctor.experienceYears} years</span>
          <span>License: {doctor.licenseNumber}</span>
          {doctor.consultationFee != null && (
            <span>Consultation fee: ৳{doctor.consultationFee}</span>
          )}
          {doctor.bio && <p className="mt-2 text-muted-foreground">{doctor.bio}</p>}
        </CardContent>
      </Card>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Upcoming available schedules</h2>
        {doctor.schedules.length === 0 ? (
          <p className="text-muted-foreground">No open schedules right now.</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {doctor.schedules.map((schedule) => (
              <li key={schedule.id} className="rounded-md border p-3 text-sm">
                <div className="font-medium">
                  {formatDateTime(schedule.startDateTime)} –{" "}
                  {formatTime(schedule.endDateTime)}
                </div>
                <div className="text-muted-foreground">
                  {schedule.availableSlots} of {schedule.totalSlots} slots open
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
