import ApiClient from "@/lib/apiClient";
import {
  LoginPayload,
  RegistrationPayload,
  ResendOtpPayload,
  VerifyEmailPayload,
} from "@/types";

export function userLogin(payload: LoginPayload) {
  return ApiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
}
export function verifyEmail(payload: VerifyEmailPayload) {
  return ApiClient("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
}
export function resendOtp(payload: ResendOtpPayload) {
  return ApiClient("/auth/resend-otp", {
    method: "POST",
    body: payload,
  });
}
export function userRegistration(payload: RegistrationPayload) {
  return ApiClient("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function userLogout() {
  return ApiClient("/auth/logout", {
    method: "POST",
  });
}
export function getMe() {
  return ApiClient("/auth/me");
}

export function googleOAuth(payload: { idToken: string }) {
  return ApiClient("/auth/google", {
    method: "POST",
    body: payload,
  });
}
