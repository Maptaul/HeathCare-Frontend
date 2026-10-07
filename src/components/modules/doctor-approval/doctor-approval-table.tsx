import { useGetAllDoctors } from "@/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DoctorReviewSheet from "./doctor-review-sheet";

export default function DoctorApprovalTable() {
  const { data, isPending } = useGetAllDoctors();

  const doctors = data?.data || [];

  console.log(doctors);

  if(isPending) {
    return <div>Loading...</div>
  }

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
            <TableRow>
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
