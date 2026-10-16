import MyAppointmentsTable from "@/components/modules/my-appointments/my-appointments-table";

export default function MyAppointmentsPage() {
  return (
    <section className="flex flex-col gap-4 p-4">
      <div>
        <h1>My Appointments</h1>
        <p>Track, pay for and cancel your booked consultations.</p>
      </div>
      <MyAppointmentsTable />
    </section>
  );
}
