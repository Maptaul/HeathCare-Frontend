"use client";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDebounce from "@/hooks/debounce.hook";
import type { DoctorParams, DoctorVerificationStatus } from "@/types";
import { Suspense, useState } from "react";
import DoctorApprovalTable from "./doctor-approval-table";
import DoctorApprovalTableLoading from "./doctor-approval-table-loading";
import DoctorReviewSheet from "./doctor-review-sheet";

const verificationStatus: ["All" | DoctorVerificationStatus, string][] = [
  ["APPROVED", "Approved"],
  ["PENDING", "Pending"],
  ["REJECTED", "Rejected"],
  ["All", "All"],
];
export default function DoctorApprovalTabs() {
  const [tab, setTab] = useState<"All" | DoctorVerificationStatus>("All");
  const [selectedId, setSelectedId] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearchInput = useDebounce(searchInput);

  const queryParams: DoctorParams = {
    page: 1,
    limit: 10,
    ...(tab === "All" ? {} : { verificationStatus: tab }),
    ...(debouncedSearchInput ? { searchTerm: debouncedSearchInput } : {}),
  };
  return (
    <>
      <div className="flex justify-between">
        <div>
          <Input
            onChange={(e) => setSearchInput(e.target.value)}
            type="search"
            placeholder="Search doctors..."
          />
        </div>
        <div>
          <Tabs
            value={tab}
            onValueChange={(value) => setTab(value)}
            className="w-full"
          >
            <TabsList>
              {verificationStatus.map(([value, label]) => (
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
        </div>
      </div>
      <Suspense fallback={<DoctorApprovalTableLoading />}>
        <DoctorApprovalTable {...queryParams} handleReview={setSelectedId} />
      </Suspense>
      <DoctorReviewSheet
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
      />
    </>
  );
}
