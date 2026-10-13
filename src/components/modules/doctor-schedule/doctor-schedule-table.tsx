"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ScheduleParams, ScheduleStatus } from "@/types";
import { Suspense, useState } from "react";
import DoctorScheduleList from "./doctor-schedule-list";
import DoctorScheduleListLoading from "./doctor-schedule-list-loading";
import ScheduleCreateDialog from "./schedule-dialog";

type Tab = "All" | ScheduleStatus;

const statusTabs: [Tab, string][] = [
  ["All", "All"],
  ["DRAFT", "Draft"],
  ["PUBLISHED", "Published"],
];

export default function DoctorScheduleTable() {
  const [tab, setTab] = useState<Tab>("All");
  const [page, setPage] = useState(1);

  const queryParams: ScheduleParams = {
    page,
    limit: 10,
    sortBy: "startDateTime",
    sortOrder: "desc",
    ...(tab === "All" ? {} : { status: tab }),
  };

  return (
    <>
      <div className="flex justify-between">
        <Tabs
          value={tab}
          onValueChange={(value: Tab) => {
            setTab(value);
            setPage(1);
          }}
        >
          <TabsList>
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
        <ScheduleCreateDialog />
      </div>
      <Suspense fallback={<DoctorScheduleListLoading />}>
        <DoctorScheduleList {...queryParams} handlePageChange={setPage} />
      </Suspense>
    </>
  );
}
