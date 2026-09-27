import z from "zod";

export const MAX_FILE_SIZE = 5;

export const MAX_FILE_SIZE_IN_BYTES = MAX_FILE_SIZE * 1024 * 1024;

export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function isAcceptedFileSize(fileSize: number) {
  return fileSize <= MAX_FILE_SIZE_IN_BYTES;
}

export function isAcceptedFileType(fileType: string) {
  return ACCEPTED_FILE_TYPES.includes(fileType);
}

export const MAX_ADDITIONAL_FILES = 5;

export const MAX_BIO_LENGTH = 50;

export const doctorApplicationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Please enter a valid email"),
  phone: z.string().trim().min(5, "Phone number is required"),
  address: z.string().trim().min(1, "Address is required"),
  specialization: z.string().trim().min(1, "Specialization is required"),
  licenseNumber: z.string().trim().min(1, "License number is required"),
  qualifications: z.string().trim().min(1, "Qualifications are required"),
  experienceYears: z.string().trim(),
  consultationFee: z.string().trim(),
  bio: z
    .string()
    .trim()
    .min(
      MAX_BIO_LENGTH,
      `Bio must be at least ${MAX_BIO_LENGTH} characters long`,
    ),
});
