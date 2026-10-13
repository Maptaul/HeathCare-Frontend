import PublicDoctorList from "@/components/modules/public-doctors/public-doctor-list";

export default function DoctorsPage() {
  return (
    <section className="container mx-auto flex flex-col gap-6 px-4 py-10">
      <div>
        <h1 className="text-3xl font-bold">Our Doctors</h1>
        <p className="text-muted-foreground">
          Find a verified doctor and see their available schedules.
        </p>
      </div>
      <PublicDoctorList />
    </section>
  );
}
