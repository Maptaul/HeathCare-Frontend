import DoctorApplyForm from "@/components/forms/doctor-apply-form";
import Image from "next/image";
import Link from "next/link";

export default function ApplyAsDoctorPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-3">
      <div className="flex flex-col col-span-2 gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Image
              height={24}
              width={24}
              src="/logo.svg"
              alt="Logo"
              className="size-6"
            />
            HealthCare
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-3xl">
            <DoctorApplyForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/desk.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
