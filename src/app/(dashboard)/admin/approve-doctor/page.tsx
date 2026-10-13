import DoctorApprovalTabs from "@/components/modules/doctor-approval/doctor-approval-tabs";

export default function ApproveDoctor() {
  return (
    <section className="p-4">
      <div>
        <h1>Approve Doctor</h1>
        <p>Review and approve new doctor applications.</p>
      </div>
      <DoctorApprovalTabs />
    </section>
  );
}
