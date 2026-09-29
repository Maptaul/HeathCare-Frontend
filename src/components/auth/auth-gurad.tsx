"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data, isPending, isError } = useGetMe();
  const user = data ? data : null;

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user) {
      router.replace("/login");
      console.error("Error fetching user data:", isError);
    }
  }, [isPending, isError, user]);

  if (isPending) {
    return <AuthLoading label="Verifying Account" />;
  }

  if (isError || !user) {
    return <AuthLoading label="Redirecting to Login" />;
  }

  return <>{children}</>;
}
