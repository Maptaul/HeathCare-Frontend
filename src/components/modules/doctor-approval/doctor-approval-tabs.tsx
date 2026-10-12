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
  const [page, setPage] = useState(1);

  const debouncedSearchInput = useDebounce(searchInput);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setPage(1); // Reset to the first page when search input changes
  };

  const queryParams: DoctorParams = {
    page: page,
    limit: 10,
    ...(tab === "All" ? {} : { verificationStatus: tab }),
    ...(debouncedSearchInput ? { searchTerm: debouncedSearchInput } : {}),
  };
  return (
    <>
      <div className="flex justify-between">
        <div>
          <Input
            onChange={(e) => handleSearch(e)}
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
        <DoctorApprovalTable
          {...queryParams}
          handleReview={setSelectedId}
          handlePageChange={setPage}
        />
      </Suspense>

      <DoctorReviewSheet
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
      />
    </>
  );
}
