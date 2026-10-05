import RoleGuard from "@/components/auth/role-gurad";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["SUPER_ADMIN", "ADMIN"]}>
      <DashboardShell>{children}</DashboardShell>
    </RoleGuard>
  );
}
