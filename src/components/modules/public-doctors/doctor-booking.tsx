"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useBookAppointment, useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";

export default function DoctorBooking({
  scheduleId,
  disabled,
}: {
  scheduleId: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const { data: me, isPending: mePending } = useGetMe();
  const { mutate: book, isPending } = useBookAppointment();

  const handleBooking = () => {
    // getMe already unwraps res.data, so `me` is the user itself
    if (!me) {
      router.push("/login");
      return;
    }
    if (me.role !== "PATIENT") {
      toast.add({
        title: "Only patients can book",
        description: "Log in with a patient account to book an appointment.",
        type: "error",
      });
      return;
    }
    book(
      { scheduleId },
      {
        // pay on bKash; backend callback confirms the appointment
        onSuccess: (res) => window.location.assign(res.data.paymentUrl),
        onError: (err) => {
          const message =
            (err as { data?: { message?: string } }).data?.message ??
            "Could not book the appointment.";
          toast.add({ title: "Booking failed", description: message, type: "error" });
        },
      },
    );
  };

  return (
    <Button onClick={handleBooking} disabled={disabled || mePending || isPending}>
      {isPending ? "Booking..." : "Book Now"}
    </Button>
  );
}
