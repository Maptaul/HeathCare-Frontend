export type ScheduleStatus = "DRAFT" | "PUBLISHED";

export interface Schedule {
  id: string;
  startDateTime: string;
  endDateTime: string;
  totalSlots: number;
  availableSlots: number;
  meetingLink: string;
  status: ScheduleStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  doctorId: string;
}

export interface ScheduleParams {
  status?: ScheduleStatus;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateSchedulePayload {
  startDateTime: string;
  endDateTime: string;
  meetingLink: string;
}
