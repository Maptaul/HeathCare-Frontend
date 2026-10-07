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
  return (
    <div className="w-full border rounded-md p-4">
      <Table>
        <TableCaption>A list of your recent doctor approvals.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Maptaul Islam </TableCell>
            <TableCell className="text-right">
              <DoctorReviewSheet />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
