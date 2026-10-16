import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PublicDoctor } from "@/types";
import Link from "next/link";
import PublicDoctorSchedules from "./public-doctor-schedules";

// Server component: doctor info is baked at build time, schedules load on the client.
export default function PublicDoctorProfile({
  doctor,
}: {
  doctor: PublicDoctor;
}) {
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
          {doctor.bio && (
            <p className="mt-2 text-muted-foreground">{doctor.bio}</p>
          )}
        </CardContent>
      </Card>

      <PublicDoctorSchedules doctorId={doctor.id} />
    </div>
  );
}
