import { getAllPublicDoctors, getPublicDoctorProfile } from "@/api/doctor.api";
import PublicDoctorProfile from "@/components/modules/public-doctors/public-doctor-profile";

// ponytail: first 100 doctors only; page through meta.totalPages if the list outgrows it
const STATIC_DOCTOR_LIMIT = 100;

export async function generateStaticParams() {
  const data = await getAllPublicDoctors({ page: 1, limit: STATIC_DOCTOR_LIMIT });
  return data.data.map((doctor) => ({ id: doctor.id }));
}

export default async function DoctorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: doctor } = await getPublicDoctorProfile(id);

  return (
    <section className="container mx-auto flex flex-col gap-6 px-4 py-10">
      <PublicDoctorProfile doctor={doctor} />
    </section>
  );
}
