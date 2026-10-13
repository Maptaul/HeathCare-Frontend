import DoctorScheduleTable from "@/components/modules/doctor-schedule/doctor-schedule-table";

export default function DoctorSchedulesPage() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <div>
        <h1>My Schedules</h1>
        <p>Create, publish and manage your consultation schedules.</p>
      </div>
      <DoctorScheduleTable />
    </section>
  );
}
