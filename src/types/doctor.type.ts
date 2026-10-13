import { User } from "./user.type";

export interface DoctorApplicationData {
  user: {
    name: string;
    email: string;
  };
  doctor: {
    specialization: string;
    licenseNumber: string;
    qualifications: string;
    experienceYears: number;
    contactNumber?: string;
    address?: string;
    consultationFee?: number;
    bio?: string;
  };
}

export interface DoctorApplicationPayload {
  resume: File | null;
  additionalFiles: File[];
  data: DoctorApplicationData;
}

export interface verifyAccountPayload {
  email: string;
  otp: string;
}

export type DoctorVerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Doctor {
  id: string;
  name: string;
  email: string;
  address?: string | null;
  specialization: string;
  licenseNumber: string;
  qualifications: string;
  experienceYears: number;
  bio?: string | null;
  consultationFee: number | string | null;
  contactNumber?: string | null;
  verificationStatus: DoctorVerificationStatus;
  rejectionReason?: string | null;
  reviewedBy?: string | null;
  reviewedAt?: string | null;
  resume?: string | null;
  additionalFiles?: { url: string; publicId: string }[] | null;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
}

export interface DoctorParams {
  verificationStatus?: DoctorVerificationStatus;
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortOrder?: "asc" | "desc";
}

export interface ApproveDoctorPayload {
  doctorId: string;
  verificationStatus: "APPROVED" | "REJECTED";
  rejectionReason?: string;
}

// Shape returned by the public (no-auth) doctor endpoints
export interface PublicDoctor {
  id: string;
  name: string;
  specialization: string;
  licenseNumber: string;
  qualifications: string;
  experienceYears: number;
  bio?: string | null;
  consultationFee: number | string | null;
  createdAt: string;
}

export interface PublicDoctorSchedule {
  id: string;
  startDateTime: string;
  endDateTime: string;
  totalSlots: number;
  availableSlots: number;
}

export interface PublicDoctorProfile extends PublicDoctor {
  schedules: PublicDoctorSchedule[];
}

export interface PublicDoctorParams {
  searchTerm?: string;
  specialization?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
