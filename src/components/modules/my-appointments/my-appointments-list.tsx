"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/ui/table-pagination";
import {
  useCancelAppointment,
  usePayAppointment,
  useSuspenseGetMyAppointments,
} from "@/hooks";
import type { Appointment, AppointmentParams } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { showApiError } from "../doctor-schedule/show-api-error";

const COLUMNS = [
  "Doctor",
  "Date",
  "Time",
  "Serial",
  "Payment",
  "Status",
  "Actions",
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { dateStyle: "medium" });
const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString(undefined, { timeStyle: "short" });

const canCancel = (a: Appointment) =>
  a.status === "PENDING" || a.status === "CONFIRMED";
// meeting link only matters once the patient actually holds a slot
const canJoin = (a: Appointment) =>
  a.status === "CONFIRMED" || a.status === "ONGOING";

interface Props extends AppointmentParams {
  handlePageChange: Dispatch<SetStateAction<number>>;
}

export default function MyAppointmentsList({
  handlePageChange,
  ...params
}: Props) {
  const { data } = useSuspenseGetMyAppointments(params);
  const { mutate: pay, isPending: isPaying } = usePayAppointment();
  const { mutate: cancel, isPending: isCancelling } = useCancelAppointment();

  const appointments = data.data;

  const handleCancel = (id: string) => {
    // ponytail: native confirm, swap for a Dialog if it needs styling
    const ok = window.confirm(
      "Cancel this appointment? A refund is only issued if you cancel more than 1 hour before the start time.",
    );
    if (ok) cancel(id, { onError: showApiError("Cancel failed") });
  };

  const handlePay = (id: string) =>
    pay(id, {
      onSuccess: (res) => window.location.assign(res.data.paymentUrl),
      onError: showApiError("Payment failed"),
    });

  return (
    <>
      <div className="w-full rounded-md border p-4">
        <Table>
          {appointments.length === 0 && (
            <TableCaption>No appointments found.</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              {COLUMNS.map((column) => (
                <TableHead
                  key={column}
                  className={column === "Actions" ? "text-right" : undefined}
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">
                  {appointment.doctor.name}
                  {appointment.doctor.specialization && (
                    <div className="text-xs text-muted-foreground">
                      {appointment.doctor.specialization}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {formatDate(appointment.schedule.startDateTime)}
                </TableCell>
                <TableCell>
                  {appointment.joiningTime
                    ? formatTime(appointment.joiningTime)
                    : `${formatTime(appointment.schedule.startDateTime)} - ${formatTime(appointment.schedule.endDateTime)}`}
                </TableCell>
                <TableCell>{appointment.serialNumber ?? "-"}</TableCell>
                <TableCell>
                  {appointment.payment
                    ? `${appointment.payment.status} (৳${appointment.payment.amount})`
                    : "-"}
                </TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell className="space-x-2 text-right">
                  {canJoin(appointment) && (
                    <a
                      href={appointment.schedule.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm underline"
                    >
                      Join
                    </a>
                  )}
                  {appointment.status === "PENDING" && (
                    <Button
                      size="sm"
                      disabled={isPaying}
                      onClick={() => handlePay(appointment.id)}
                    >
                      Pay Now
                    </Button>
                  )}
                  {canCancel(appointment) && (
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={isCancelling}
                      onClick={() => handleCancel(appointment.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-end">
        <TablePagination
          totalPages={data.meta.totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
}
