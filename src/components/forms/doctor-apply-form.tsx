"use client";
import {
  isAcceptedFileSize,
  isAcceptedFileType,
} from "@/validation/doctor-application.validation";
import { useForm } from "@tanstack/react-form";
import {
  Banknote,
  BriefcaseBusiness,
  CircleCheck,
  FileUp,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Stethoscope,
  User,
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

const iconClass =
  "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground";

const BIO_MAX = 1000;

const optionalTag = (
  <span className="font-normal text-muted-foreground">(optional)</span>
);

export default function DoctorApplyForm() {
  const router = useRouter();

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
    },
    onSubmit: async ({ value }) => {
      console.log(value);
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
                    <FieldLabel htmlFor={field.name}>Contact number</FieldLabel>
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
                    maxLength={BIO_MAX}
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
                      {field.state.value.length}/{BIO_MAX}
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

              const file = field.state.value as File;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="resume-field">Resume</FieldLabel>

                  <div>
                    <Button
                      render={<label htmlFor="resume-field" />}
                      nativeButton={false}
                      variant="outline"
                    >
                      <FileUp size="4" />
                      Upload resume {optionalTag}
                    </Button>

                    <input
                      id="resume-field"
                      type="file"
                      className="sr-only"
                      name={field.name}
                      onChange={(e) => {
                        const selected = e.target.files?.[0] ?? null;

                        if (
                          selected &&
                          (!isAcceptedFileSize(selected.size) ||
                            !isAcceptedFileType(selected.type))
                        ) {
                          field.handleBlur();
                          return;
                        }

                        field.handleChange(selected);
                        e.target.value = "";
                      }}
                    />
                    {file ? (
                      <span className="ml-2 text-sm text-muted-foreground">
                        {file.name} ({(file.size / (1024 * 1024)).toFixed(2)}{" "}
                        MB)
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

          <Button type="submit" className="h-11 w-full text-base font-medium">
            Submit application
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
