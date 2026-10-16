"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import TablePagination from "@/components/ui/table-pagination";
import { useGetAllPublicDoctors } from "@/hooks";
import useDebounce from "@/hooks/debounce.hook";
import Link from "next/link";
import { useState } from "react";

const PAGE_SIZE = 9;

export default function PublicDoctorList() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const searchTerm = useDebounce(searchInput);

  const { data, isPending, isError, error } = useGetAllPublicDoctors({
    page,
    limit: PAGE_SIZE,
    ...(searchTerm ? { searchTerm } : {}),
  });

  return (
    <div className="flex flex-col gap-6">
      <Input
        type="search"
        placeholder="Search by name, specialization or qualification..."
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setPage(1);
        }}
        className="max-w-md"
      />

      {isError && (
        <p role="alert" className="text-destructive">
          Could not load doctors: {error.message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isPending
          ? Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))
          : data?.data.map((doctor) => (
              <Card key={doctor.id}>
                <CardHeader>
                  <CardTitle>{doctor.name}</CardTitle>
                  <CardDescription>{doctor.specialization}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-1 text-sm">
                  <span>{doctor.qualifications}</span>
                  <span>{doctor.experienceYears} years experience</span>
                  {doctor.consultationFee != null && (
                    <span>Fee: ৳{doctor.consultationFee}</span>
                  )}
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/doctors/${doctor.id}`}
                    className="text-sm font-medium underline"
                  >
                    View profile
                  </Link>
                </CardFooter>
              </Card>
            ))}
      </div>

      {data && data.data.length === 0 && (
        <p className="text-muted-foreground">No doctors found.</p>
      )}

      {data && data.meta.totalPages > 1 && (
        <div className="flex justify-end">
          <TablePagination
            totalPages={data.meta.totalPages}
            handlePageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
