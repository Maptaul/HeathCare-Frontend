import {
  getMe,
  googleOAuth,
  userLogin,
  userLogout,
  userRegistration,
  verifyEmail,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}
export function useVerifyEmail() {
  return useMutation({
    mutationFn: verifyEmail,
  });
}
export function useRegistration() {
  return useMutation({
    mutationFn: userRegistration,
  });
}
export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}
export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}

export function useGoogleOAuth() {
  return useMutation({
    mutationFn: googleOAuth,
  });
}
