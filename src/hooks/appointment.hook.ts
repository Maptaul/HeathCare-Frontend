import {
  bookAppointment,
  cancelAppointment,
  getMyAppointments,
  payAppointment,
} from "@/api";
import type { AppointmentParams } from "@/types";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export function useBookAppointment() {
  return useMutation({
    mutationFn: bookAppointment,
  });
}

export function usePayAppointment() {
  return useMutation({
    mutationFn: payAppointment,
  });
}

export function useCancelAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

export function useSuspenseGetMyAppointments(params: AppointmentParams) {
  return useSuspenseQuery({
    queryKey: ["appointments", params],
    queryFn: () => getMyAppointments(params),
  });
}
