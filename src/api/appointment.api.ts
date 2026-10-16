import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  Appointment,
  AppointmentParams,
  BookAppointmentPayload,
  BookAppointmentResponse,
} from "@/types";

export function bookAppointment(payload: BookAppointmentPayload) {
  return apiClient<ApiResponse<BookAppointmentResponse>>(
    "/appointment/book-appointment",
    {
      method: "POST",
      body: payload,
    },
  );
}

export function getMyAppointments(params: AppointmentParams) {
  return apiClient<ApiResponse<Appointment[]>>("/appointment/my-appointments", {
    params,
  });
}

// retry payment for a PENDING appointment; returns a fresh bKash URL
export function payAppointment(appointmentId: string) {
  return apiClient<ApiResponse<{ paymentUrl: string }>>(
    "/appointment/pay-appointment",
    {
      method: "POST",
      body: { appointmentId },
    },
  );
}

export function cancelAppointment(appointmentId: string) {
  return apiClient("/appointment/cancel-appointment", {
    method: "POST",
    body: { appointmentId },
  });
}
