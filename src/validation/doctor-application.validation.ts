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

export function isAcceptedFile(value: unknown): value is File {
  return (
    value instanceof File &&
    isAcceptedFileSize(value.size) &&
    isAcceptedFileType(value.type)
  );
}

export const MAX_ADDITIONAL_FILES = 5;

export const MIN_BIO_LENGTH = 50;

export const MAX_BIO_LENGTH = 1000;

const FILE_RULES = `allowed types: JPG, PNG, PDF, DOC, DOCX; max ${MAX_FILE_SIZE}MB`;

// Form inputs hold "" when empty, so optional fields must accept "" (not just undefined)
const optionalText = (minLength: number, message: string) =>
  z
    .string()
    .trim()
    .refine((value) => value === "" || value.length >= minLength, { message });

export const doctorApplicationSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().toLowerCase().pipe(z.email("Invalid email")),
  phone: optionalText(5, "Contact number must be at least 5 characters"),
  address: optionalText(5, "Address must be at least 5 characters"),
  specialization: z.string().trim().min(2, "Specialization is required"),
  licenseNumber: z.string().trim().min(2, "License number is required"),
  qualifications: z.string().trim().min(2, "Qualifications are required"),
  experience: z
    .string()
    .trim()
    .regex(/^\d+$/, "Experience must be a whole number")
    .refine((value) => Number(value) <= 60, {
      message: "Years of experience must be between 0 to 60",
    }),
  consultationFee: z
    .string()
    .trim()
    .refine((value) => value === "" || /^\d+(\.\d{1,2})?$/.test(value), {
      message: "Consultation fee must be a positive number",
    }),
  bio: optionalText(
    MIN_BIO_LENGTH,
    `Bio must be at least ${MIN_BIO_LENGTH} characters long`,
  ).refine((value) => value.length <= MAX_BIO_LENGTH, {
    message: `Bio cannot exceed ${MAX_BIO_LENGTH} characters`,
  }),
  resume: z.custom<File | null>(
    (value) => value === null || isAcceptedFile(value),
    { message: `Invalid resume (${FILE_RULES})` },
  ),
  additionalFiles: z
    .array(
      z.custom<File>(isAcceptedFile, {
        message: `Invalid file (${FILE_RULES})`,
      }),
    )
    .max(
      MAX_ADDITIONAL_FILES,
      `You can upload a maximum of ${MAX_ADDITIONAL_FILES} additional files`,
    ),
});
