import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  CreateSchedulePayload,
  Schedule,
  ScheduleParams,
} from "@/types";

export function getMySchedules(params: ScheduleParams) {
  return apiClient<ApiResponse<Schedule[]>>("/schedule/my-schedules", {
    params,
  });
}

export function createSchedule(payload: CreateSchedulePayload) {
  return apiClient<ApiResponse<Schedule>>("/schedule/create-schedule", {
    method: "POST",
    body: payload,
  });
}

export function publishSchedule(scheduleId: string) {
  return apiClient(`/schedule/publish-schedule/${scheduleId}`, {
    method: "PATCH",
  });
}

export function deleteSchedule(scheduleId: string) {
  return apiClient(`/schedule/${scheduleId}`, {
    method: "DELETE",
  });
}
