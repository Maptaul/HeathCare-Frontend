import PublicDoctorProfile from "@/components/modules/public-doctors/public-doctor-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

// Query param (?id=) instead of a [doctorId] route: next.config uses
// output: "export", which can't pre-render unknown doctor ids.
export default function DoctorProfilePage() {
  return (
    <section className="container mx-auto px-4 py-10">
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <PublicDoctorProfile />
      </Suspense>
    </section>
  );
}
