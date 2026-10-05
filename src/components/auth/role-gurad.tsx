"use client";

import { useGetMe } from "@/hooks";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AccessDenied from "./access-denied";
import AuthLoading from "./auth-loading";

interface IProps {
  children: ReactNode;
  roles: UserRole[];
}

export default function RoleGuard({ children, roles }: IProps) {
  const router = useRouter();
  const { data, isPending, isError } = useGetMe();
  const user = data ? data : null;

  const isAuthorized = !!user && roles.includes(user.role);

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

  if (isAuthorized) {
    return <>{children}</>;
  }

  return <AccessDenied />;
}
