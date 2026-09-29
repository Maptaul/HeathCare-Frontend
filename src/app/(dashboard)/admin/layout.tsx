import AuthGuard from "@/components/auth/auth-gurad";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
