import ApiClient from "@/lib/apiClient";

export function userLogin(payload: { email: string; password: string }) {
  return ApiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
}
