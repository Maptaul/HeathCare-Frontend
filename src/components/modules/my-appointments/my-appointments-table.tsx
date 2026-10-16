"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import type { AppointmentParams, AppointmentStatus } from "@/types";
import { Suspense, useEffect, useState } from "react";
import MyAppointmentsList from "./my-appointments-list";

type Tab = "All" | AppointmentStatus;

const statusTabs: [Tab, string][] = [
  ["All", "All"],
  ["PENDING", "Pending"],
  ["CONFIRMED", "Confirmed"],
  ["ONGOING", "Ongoing"],
  ["COMPLETED", "Completed"],
  ["CANCELLED", "Cancelled"],
];

// bKash callback redirects here with ?status=success|failure|cancel or ?error=...
const paymentToasts = {
  success: {
    title: "Payment successful",
    description: "Your appointment is confirmed.",
    type: "success",
  },
  failure: {
    title: "Payment failed",
    description: "You can retry from the Pending tab.",
    type: "error",
  },
  cancel: {
    title: "Payment cancelled",
    description: "You can retry from the Pending tab.",
    type: "error",
  },
  error: {
    title: "Payment error",
    description: "Something went wrong while verifying the payment.",
    type: "error",
  },
} as const;

export default function MyAppointmentsTable() {
  const [tab, setTab] = useState<Tab>("All");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const key = search.has("error") ? "error" : search.get("status");
    if (!key || !(key in paymentToasts)) return;
    toast.add(paymentToasts[key as keyof typeof paymentToasts]);
    // drop the query so a refresh doesn't toast again
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  const queryParams: AppointmentParams = {
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
    ...(tab === "All" ? {} : { status: tab }),
  };

  return (
    <>
      <Tabs
        value={tab}
        onValueChange={(value: Tab) => {
          setTab(value);
          setPage(1);
        }}
      >
        <TabsList className="h-auto flex-wrap">
          {statusTabs.map(([value, label]) => (
            <TabsTrigger
              key={value}
              value={value}
              className="normal-case tracking-normal"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Suspense
        fallback={
          <div className="w-full space-y-3 rounded-md border p-4">
            {[1, 2, 3].map((row) => (
              <Skeleton key={row} className="h-6 w-full" />
            ))}
          </div>
        }
      >
        <MyAppointmentsList {...queryParams} handlePageChange={setPage} />
      </Suspense>
    </>
  );
}
