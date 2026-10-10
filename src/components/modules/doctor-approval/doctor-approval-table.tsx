import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspenseGetAllDoctors } from "@/hooks";
import { DoctorParams } from "@/types";
import DoctorReviewSheet from "./doctor-review-sheet";

interface Props extends DoctorParams {}

export default function DoctorApprovalTable({ ...params }: Props) {
  const { data } = useSuspenseGetAllDoctors(params);

  const doctors = data?.data;

  return (
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
                <DoctorReviewSheet />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
