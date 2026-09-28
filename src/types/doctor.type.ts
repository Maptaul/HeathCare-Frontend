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
