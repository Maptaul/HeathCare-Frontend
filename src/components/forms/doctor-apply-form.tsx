"use client";
import { useApplyAsDoctor } from "@/hooks";
import type { DoctorApplicationData } from "@/types/doctor.type";
import { formatFileSize } from "@/utils";

import { useForm } from "@tanstack/react-form";
import {
  Banknote,
  BriefcaseBusiness,
  CircleCheck,
  FileText,
  FileUp,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Stethoscope,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/toast";
import {
  ACCEPTED_FILE_TYPES,
  doctorApplicationSchema,
  MAX_ADDITIONAL_FILES,
  MAX_BIO_LENGTH,
} from "@/validation";

//data signature

// {
//   "user": {
//     "name": "Dr. Fatima",
//     "email": "fatima@example.com"
//   },
//   "doctor": {
//     "address": "House 12, Road 5, Dhanmondi, Dhaka",
//     "specialization": "Cardiology",
//     "licenseNumber": "BMDC-2026-98765",
//     "qualifications": "MBBS, FCPS (Cardiology)",
//     "experienceYears": 8,
//     "bio": "Consultant cardiologist with 8 years of experience in interventional cardiology.",
//     "consultationFee": 1000,
//     "contactNumber": "+8801700000099"
//   }
// }

const iconClass =
  "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground";

const ACCEPT_ATTR = ACCEPTED_FILE_TYPES.join(",");

// Empty optional inputs are sent as undefined (dropped by JSON.stringify)
const optionalValue = (value: string) => value.trim() || undefined;

const optionalTag = (
  <span className="font-normal text-muted-foreground">(optional)</span>
);

export default function DoctorApplyForm() {
  const router = useRouter();
  const { mutate: apply, isPending: applyPending } = useApplyAsDoctor();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      specialization: "",
      licenseNumber: "",
      qualifications: "",
      experience: "",
      consultationFee: "",
      bio: "",
      resume: null as File | null,
      additionalFiles: [] as File[],
    },
    validators: {
      onSubmit: doctorApplicationSchema,
    },
    onSubmit: async ({ value }) => {
      const doctorData: DoctorApplicationData = {
        user: {
          name: value.name.trim(),
          email: value.email.trim().toLowerCase(),
        },
        doctor: {
          address: optionalValue(value.address),
          specialization: value.specialization.trim(),
          licenseNumber: value.licenseNumber.trim(),
          qualifications: value.qualifications.trim(),
          experienceYears: Number(value.experience),
          bio: optionalValue(value.bio),
          consultationFee: value.consultationFee.trim()
            ? Number(value.consultationFee)
            : undefined,
          contactNumber: optionalValue(value.phone),
        },
      };
      apply(
        {
          data: doctorData,
          resume: value.resume,
          additionalFiles: value.additionalFiles,
        },
        {
          onSuccess: (res) => {
            if (!res.success) {
              toast.add({
                title: "Server Failure",
                description: res.message || "Please try again later.",
                type: "error",
              });
              return;
            }
            toast.add({
              title: "Application Submitted",
              description:
                "Your application has been submitted successfully. Please check your email for verification.",
              type: "success",
            });
            const params = new URLSearchParams({
              email: doctorData.user.email,
            });
            router.push(`/apply-as-doctor/verify-account?${params.toString()}`);
          },
          onError: (err) => {
            const message = (err as { data?: { message?: string } }).data
              ?.message;
            toast.add({
              title: "Application Failed",
              description:
                message || "Please check your details and try again.",
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border bg-card p-8 shadow-lg">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Stethoscope className="size-6" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Apply to join PH Healthcare
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Submit your details and our team will review your application
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <div className="grid gap-6 md:grid-cols-2">
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                    <div className="relative">
                      <User className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Dr. John Doe"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                        className="h-11 pl-9"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                    <div className="relative">
                      <Mail className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        placeholder="doctor@example.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                        className="h-11 pl-9"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="phone">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Contact number {optionalTag}
                    </FieldLabel>
                    <div className="relative">
                      <Phone className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="tel"
                        placeholder="+880 1712 345678"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                        className="h-11 pl-9"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="address">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Practice address {optionalTag}
                    </FieldLabel>
                    <div className="relative">
                      <MapPin className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Chamber or hospital address"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                        className="h-11 pl-9"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="specialization">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Specialization</FieldLabel>
                    <div className="relative">
                      <Stethoscope className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Cardiology"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                        className="h-11 pl-9"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="licenseNumber">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      BMDC registration number
                    </FieldLabel>
                    <div className="relative">
                      <CircleCheck className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="A-12345"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                        className="h-11 pl-9"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="qualifications">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Qualifications</FieldLabel>
                    <div className="relative">
                      <GraduationCap className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="MBBS, FCPS (Medicine)"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                        className="h-11 pl-9"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="experience">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Years of experience
                    </FieldLabel>
                    <div className="relative">
                      <BriefcaseBusiness className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        min={0}
                        placeholder="10"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                        className="h-11 pl-9"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="consultationFee">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Consultation fee (BDT) {optionalTag}
                    </FieldLabel>
                    <div className="relative">
                      <Banknote className={iconClass} />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        min={0}
                        placeholder="1000"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                        className="h-11 pl-9"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>
          <form.Field name="bio">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Professional bio {optionalTag}
                  </FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    maxLength={MAX_BIO_LENGTH}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Share your background, areas of interest and patient care philosophy..."
                    className="min-h-24"
                  />
                  <div className="flex justify-between">
                    <FieldDescription>
                      Shown on your public profile after approval.
                    </FieldDescription>
                    <FieldDescription>
                      {field.state.value.length}/{MAX_BIO_LENGTH}
                    </FieldDescription>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="resume">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              const file = field.state.value;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="resume-field">Resume</FieldLabel>

                  <div>
                    <Button
                      render={<label htmlFor="resume-field" />}
                      nativeButton={false}
                      variant="outline"
                    >
                      <FileUp className="size-4" />
                      Upload resume {optionalTag}
                    </Button>

                    <input
                      id="resume-field"
                      type="file"
                      accept={ACCEPT_ATTR}
                      className="sr-only"
                      name={field.name}
                      onChange={(e) => {
                        const selected = e.target.files?.[0] ?? null;

                        field.handleChange(selected);
                        e.target.value = "";
                      }}
                    />
                    {file ? (
                      <span className="ml-2 text-sm text-muted-foreground">
                        {file.name} ({formatFileSize(file.size)})
                      </span>
                    ) : (
                      <span className="ml-2 text-sm text-muted-foreground">
                        No file selected
                      </span>
                    )}
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="additionalFiles">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              const files = field.state.value;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="additional-files">
                    Additional Files
                  </FieldLabel>

                  <div>
                    <Button
                      render={<label htmlFor="additional-files" />}
                      nativeButton={false}
                      variant="outline"
                    >
                      <FileUp className="size-4" />
                      Upload additional files {optionalTag}
                    </Button>

                    <input
                      id="additional-files"
                      type="file"
                      multiple
                      accept={ACCEPT_ATTR}
                      className="sr-only"
                      name={field.name}
                      onChange={(e) => {
                        const incoming = Array.from(e.target.files ?? []);

                        e.target.value = "";
                        if (incoming.length === 0) {
                          return;
                        }
                        if (
                          files.length + incoming.length >
                          MAX_ADDITIONAL_FILES
                        ) {
                          toast.add({
                            title: "Too many files",
                            description: `You can upload a maximum of ${MAX_ADDITIONAL_FILES} additional files.`,
                            type: "error",
                          });
                        }
                        field.handleChange(
                          [...files, ...incoming].slice(
                            0,
                            MAX_ADDITIONAL_FILES,
                          ),
                        );
                      }}
                    />
                    <span className="ml-2 text-sm text-muted-foreground">
                      {files.length > 0
                        ? `${files.length} of ${MAX_ADDITIONAL_FILES} added`
                        : "No file selected"}
                    </span>
                    {files.length > 0 && (
                      <ul className="ml-2 mt-1 text-sm text-muted-foreground">
                        {files.map((file, index) => (
                          <li
                            key={`${file.name}-${file.lastModified}-${index}`}
                            className="flex items-center gap-2 justify-between"
                          >
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <FileText className="size-4" />
                              <span>{file.name}</span>
                              <span>({formatFileSize(file.size)})</span>
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              aria-label={`Remove ${file.name}`}
                              size="icon"
                              onClick={() => {
                                field.handleChange(
                                  files.filter((_, i) => i !== index),
                                );
                              }}
                            >
                              <X className="size-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button
            type="submit"
            disabled={applyPending}
            className="h-11 w-full text-base font-medium"
          >
            {applyPending ? "Submitting..." : "Submit application"}
          </Button>
        </FieldGroup>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already an approved doctor?{" "}
        <Link
          href="/login"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
        . Patients should use the{" "}
        <Link
          href="/register"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          patient registration
        </Link>{" "}
        form instead.
      </p>
    </div>
  );
}
