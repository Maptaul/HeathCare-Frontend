"use client";
import { useResendOtp, useVerifyEmail } from "@/hooks";
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
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { toast } from "../ui/toast";

const RESEND_COOLDOWN = 120; // seconds

export default function AccountVerifyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const { mutate: verify, isPending: verifyPending } = useVerifyEmail();
  const { mutate: resend, isPending: resendPending } = useResendOtp();
  const email = searchParams.get("email") || "";
  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendTimer]);

  if (!email) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Email not found. Please register again.
      </p>
    );
  }

  const handleResendOtp = () => {
    resend(
      { email },
      {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Resend failed",
              description: res.message || "Please try again later.",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "OTP resent",
            description: `A new code has been sent to ${email}.`,
            type: "success",
          });
          setOtp("");
          setResendTimer(RESEND_COOLDOWN);
        },
        onError: (err) => {
          const message = (err as { data?: { message?: string } }).data
            ?.message;
          toast.add({
            title: "Resend failed",
            description: message || "Please try again later.",
            type: "error",
          });
        },
      },
    );
  };

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
          <FieldDescription>
            {resendTimer > 0
              ? `Resend the code in ${resendTimer}s`
              : "You can resend the code now"}
          </FieldDescription>
        </form>
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          // {...{ autoComplete: "off" }}
          disabled={resendTimer > 0 || resendPending}
          type="button"
          variant="outline"
          onClick={handleResendOtp}
        >
          {resendPending ? "Resending..." : "Resend"}
        </Button>
        <Button type="submit" form="otp-form" disabled={verifyPending}>
          {verifyPending ? "Verifying..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
