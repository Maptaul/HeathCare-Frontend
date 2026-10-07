import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { applyAsDoctor, getAllDoctors, resendDoctorOtp, verifyDoctorAccount } from "@/api";

export function useApplyAsDoctor() {
  return useMutation({
    mutationFn: applyAsDoctor,
  });
}

export function useVerifyDoctorAccount() {
  return useMutation({
    mutationFn: verifyDoctorAccount,
  });
}

export function useResendDoctorOtp() {
  return useMutation({
    mutationFn: resendDoctorOtp,
  });
}

export function useGetAllDoctors() {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: getAllDoctors,
  });
}
export function useSuspenseGetAllDoctors() {
  return useSuspenseQuery({
    queryKey: ["doctors"],
    queryFn: getAllDoctors,
  });
}
