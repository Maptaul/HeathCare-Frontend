"use client";
import { useVerifyEmail } from "@/hooks";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { toast } from "../ui/toast";
export default function AccountVerifyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const { mutate: verify, isPending: verifyPending } = useVerifyEmail();
  const email = searchParams.get("email") || "";
  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email, router]);

  if (!email) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Email not found. Please register again.
      </p>
    );
  }

  const handleOtpSubmit = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = {
      email,
      otp,
    };
    verify(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Verification failed",
            description:
              res.message || "Please check your information and try again.",
            type: "error",
          });
          return;
        }

        toast.add({
          title: "Verification successful",
          description: "Your account has been verified.",
          type: "success",
        });
        router.push("/");
      },
      onError: (err) => {
        const message = (err as { data?: { message?: string } }).data?.message;
        toast.add({
          title: "Verification failed",
          description:
            message || "Please check your information and try again.",
          type: "error",
        });
      },
    });
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>Verify Your Account</CardTitle>
        <CardDescription>
          We&apos;ve sent a 6-digit code to {email}. Enter it below to verify
          your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleOtpSubmit();
          }}
        >
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">Enter the 6-digit code</FieldLabel>
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => {
                setOtp(value);
                if (isInvalid) {
                  setIsInvalid(false);
                }
              }}
              autoComplete="off"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {isInvalid && (
              <FieldError
                errors={[{ message: "Please enter a valid 6-digit code" }]}
              />
            )}
          </Field>
        </form>
      </CardContent>
      <CardFooter className="gap-2">
        {/* TODO: wire onClick once a resend-OTP hook exists */}
        <Button type="button" variant="outline">
          Resend
        </Button>
        <Button type="submit" form="otp-form" disabled={verifyPending}>
          {verifyPending ? "Verifying..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
