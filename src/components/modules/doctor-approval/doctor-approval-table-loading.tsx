"use client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function doctorApprovalTableLoading() {
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
          {[1, 2, 3].map((doctor) => (
            <TableRow key={doctor}>
              <TableCell colSpan={6} className="font-medium">
                <Skeleton className="h-4 w-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
