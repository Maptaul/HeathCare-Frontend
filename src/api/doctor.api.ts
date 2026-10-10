import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  Doctor,
  DoctorApplicationPayload,
  DoctorParams,
  ResendOtpPayload,
  verifyAccountPayload,
} from "@/types";

export function applyAsDoctor(payload: DoctorApplicationPayload) {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));
  if (payload.resume) {
    formData.append("resume", payload.resume);
  }

  for (const file of payload.additionalFiles) {
    formData.append("additionalFiles", file);
  }

  return apiClient("/doctor/apply-as-doctor", {
    method: "POST",
    body: formData,
  });
}
export function verifyDoctorAccount(payload: verifyAccountPayload) {
  return apiClient("/doctor/apply-as-doctor/verify-email", {
    method: "POST",
    body: payload,
  });
}
export function resendDoctorOtp(payload: ResendOtpPayload) {
  return apiClient("/doctor/apply-as-doctor/resend-otp", {
    method: "POST",
    body: payload,
  });
}

export function getAllDoctors(params: DoctorParams) {
  return apiClient<ApiResponse<Doctor[]>>("/doctor/all-doctors", {
    params,
  });
}
