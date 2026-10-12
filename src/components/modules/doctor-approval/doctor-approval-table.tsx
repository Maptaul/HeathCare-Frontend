import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/ui/table-pagination";
import { useSuspenseGetAllDoctors } from "@/hooks";
import { DoctorParams } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface Props extends DoctorParams {
  handleReview: Dispatch<SetStateAction<string>>;
  handlePageChange: Dispatch<SetStateAction<number>>;
  page: number;
}

export default function DoctorApprovalTable({
  handleReview,
  handlePageChange,
  ...params
}: Props) {
  const { data } = useSuspenseGetAllDoctors(params);

  const doctors = data?.data;

  return (
    <>
      <div className="w-full border rounded-md p-4">
        <Table>
          <TableCaption>A list of your recent doctor approvals.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>License No</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contract No</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell className="font-medium">
                  {doctor.licenseNumber}
                </TableCell>
                <TableCell className="font-medium">{doctor.email}</TableCell>
                <TableCell className="font-medium">
                  {doctor.contactNumber ? doctor.contactNumber : " -"}
                </TableCell>
                <TableCell className="font-medium">
                  {doctor.specialization}
                </TableCell>
                <TableCell className="text-right">
                  {/* <DoctorReviewSheet /> */}
                  {doctor.user.emailVerified ? (
                    <Button
                      variant="outline"
                      onClick={() => handleReview(doctor.id)}
                      disabled={doctor.user.emailVerified !== "PENDING"}
                    >
                      Review
                    </Button>
                  ) : (
                    <Button>Not Verified</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mt-4">
        <TablePagination
          totalPages={data?.meta.totalPages ?? 0}
          handlePageChange={handlePageChange}
          page={params.page ?? 0}
        />
      </div>
    </>
  );
}
