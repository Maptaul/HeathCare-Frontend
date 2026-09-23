import ApiClient from "@/lib/apiClient";
import { RegistrationPayload } from "@/types";

export function userLogin(payload: { email: string; password: string }) {
  return ApiClient("/auth/login", {
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
