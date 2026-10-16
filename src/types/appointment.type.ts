import type { Schedule } from "./schedule.type";

export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "ONGOING"
  | "COMPLETED";

export type PaymentStatus =
  | "UNPAID"
  | "PAID"
  | "FAILED"
  | "REFUNDED"
  | "CANCELLED";

export interface BookAppointmentPayload {
  scheduleId: string;
}

// backend returns the bKash checkout URL; the browser must be sent there to pay
export interface BookAppointmentResponse {
  appointmentId: string;
  paymentUrl: string;
}

export interface Appointment {
  id: string;
  status: AppointmentStatus;
  serialNumber: number | null;
  joiningTime: string | null;
  createdAt: string;
  doctor: { id: string; name: string; specialization: string | null };
  schedule: Schedule;
  payment: { status: PaymentStatus; amount: string } | null;
}

export interface AppointmentParams {
  status?: AppointmentStatus;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
