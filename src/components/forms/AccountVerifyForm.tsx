"use client";
import { useSearchParams } from "next/navigation";

export default function AccountVerifyForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  return (
    <div>
      <h1 className="text-2xl font-semibold">user email: {email}</h1>
    </div>
  );
}
