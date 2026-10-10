"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllDoctors } from "@/hooks/doctor.hook";
import { DoctorParams } from "@/types";
import { Button } from "@base-ui/react";
import { useState } from "react";

interface Props extends DoctorParams {
  selectedId: string;
  onClose: () => void;
}

export default function DoctorReviewSheet({
  selectedId,
  onClose,
  ...params
}: Props) {
  const [confirmRejection, setConfirmationRejection] = useState(false);
  const { data } = useGetAllDoctors(params);

  const selectedDoctor = data?.data.find((doctor) => doctor.id === selectedId);
  const handleReviewAction = (doctorId: string) => {
    setConfirmationRejection(false);
    onclose();
  };

  if (!selectedDoctor) {
    return null;
  }

  return (
    <Sheet open={!!selectedId} onOpenChange={onClose}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            Review and take action on {selectedDoctor?.name}
          </SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>
        </SheetHeader>
        Doctor Name: {selectedDoctor?.name}
        <br />
        License Number: {selectedDoctor?.licenseNumber}
        <SheetFooter>
          {confirmRejection ? (
            <div className="flex flex-col gap-2 w-full">
              <Textarea placeholder="Enter rejection reason..." />
              <Button
                onClick={handleReviewAction}
                variant="outline"
                size="lg"
                className="w-full"
              >
                Confirm Rejection
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 w-full">
              <Button
                onClick={() => setConfirmationRejection(true)}
                variant="destructive"
                size="lg"
                className="flex-1"
              >
                Reject
              </Button>
              <Button
                onClick={handleReviewAction}
                variant="default"
                size="lg"
                className="flex-1"
              >
                Approve
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
