"use client";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldLabel } from "../ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

export default function AccountVerifyForm() {
  const searchParams = useSearchParams();

  const [otp, setOtp] = useState("");

  const handleOtpSubmit = () => {
    console.log(otp);
  };
  const email = searchParams.get("email");
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>Verify Your Account</CardTitle>
        <CardDescription>
          {" "}
          We've sent a verification link to {email}. Please check your email and
          click the link to verify your account.
        </CardDescription>
        <CardContent>
          {" "}
          <form
            id="otp-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleOtpSubmit();
            }}
          >
            <Field>
              <FieldLabel htmlFor="otp"> Enter the 6-digit code </FieldLabel>
              <InputOTP
                maxLength={6}
                onChange={(value) => {
                  setOtp(value);
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
            </Field>
          </form>{" "}
        </CardContent>
        <CardFooter>
          <Button>Resend</Button>
          <Button form="otp-form">Submit</Button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
