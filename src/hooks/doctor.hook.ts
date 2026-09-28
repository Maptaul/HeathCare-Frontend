import { useMutation } from "@tanstack/react-query";
import { applyAsDoctor, resendDoctorOtp, verifyDoctorAccount } from "@/api";

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
