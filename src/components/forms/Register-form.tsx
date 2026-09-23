"use client";
import { useRegistration } from "@/hooks";
import { patientRegistrationZodSchema } from "@/validation";
import { useForm } from "@tanstack/react-form";
import {
  Eye,
  EyeClosed,
  Lock,
  Mail,
  Phone,
  Stethoscope,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import z from "zod";
import GoogleLoginComponent from "../modules/google-login/GoogleLogin";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

const iconClass =
  "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground";
const toggleClass =
  "absolute inset-y-0 right-3 flex items-center text-muted-foreground transition-colors hover:text-foreground";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  type PatientDefaultValue = z.infer<typeof patientRegistrationZodSchema>;

  const defaultValues: PatientDefaultValue = {
    name: "maptaul",
    email: "maptaulislam1@gmail.com",
    contactNumber: "01846035436",
    password: "Pa$$w0rd!",
    confirmPassword: "Pa$$w0rd!",
  };

  const { mutate: registration, isPending: registerPending } =
    useRegistration();

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: patientRegistrationZodSchema,
    },
    onSubmit: async ({ value }) => {
      const registrationData = {
        name: value.name,
        email: value.email,
        password: value.password,
        patient: {
          contactNumber: value.contactNumber || undefined,
        },
      };
      registration(registrationData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Registration failed",
              description:
                res.message || "Please check your information and try again.",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Registration successful",
            description:
              "Please check your email for verification instructions.",
            type: "success",
          });
          const params = new URLSearchParams({ email: registrationData.email });
          router.push(`/register/account-verify?${params.toString()}`);
        },
        onError: (err) => {
          const message = (err as { data?: { message?: string } }).data
            ?.message;
          toast.add({
            title: "Registration failed",
            description:
              message || "Please check your information and try again.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border bg-card p-8 shadow-lg">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Stethoscope className="size-6" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Join us to manage your healthcare in one place
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <div className="relative">
                    <User className={iconClass} />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="John Doe"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                      className="h-11 pl-9"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <div className="relative">
                    <Mail className={iconClass} />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="you@example.com"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                      className="h-11 pl-9"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="contactNumber">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                  <div className="relative">
                    <Phone className={iconClass} />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      placeholder="+880 1XXX-XXXXXX"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                      className="h-11 pl-9"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Lock className={iconClass} />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="new-password"
                      aria-invalid={isInvalid}
                      className="h-11 pl-9 pr-10"
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((prev) => !prev)}
                      className={toggleClass}
                    >
                      {showPassword ? (
                        <EyeClosed className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="confirmPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <div className="relative">
                    <Lock className={iconClass} />
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="new-password"
                      aria-invalid={isInvalid}
                      className="h-11 pl-9 pr-10"
                    />
                    <button
                      type="button"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className={toggleClass}
                    >
                      {showConfirmPassword ? (
                        <EyeClosed className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <Button
            type="submit"
            disabled={registerPending}
            className="h-11 w-full text-base font-medium"
          >
            {registerPending ? (
              <>
                <Spinner /> Creating account...
              </>
            ) : (
              <>Create account</>
            )}
          </Button>
        </FieldGroup>
      </form>
      <FieldSeparator className="my-6">Or continue with</FieldSeparator>
      <GoogleLoginComponent />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
