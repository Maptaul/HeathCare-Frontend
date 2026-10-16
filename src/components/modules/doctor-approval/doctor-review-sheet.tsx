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
import { useApproveDoctor, useGetAllDoctors } from "@/hooks/doctor.hook";
import { ApproveDoctorPayload, DoctorParams } from "@/types";
import { Button } from "@/components/ui/button";
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
  const [rejectionReason, setRejectionReason] = useState("");
  console.log(rejectionReason);
  const { data } = useGetAllDoctors(params);

  const { mutate: verify, isPending } = useApproveDoctor();

  const selectedDoctor = data?.data.find((doctor) => doctor.id === selectedId);

  const handleClose = () => {
    setConfirmationRejection(false);
    setRejectionReason("");
    onClose();
  };
  const handleReviewAction = (status: "APPROVED" | "REJECTED") => {
    const reviewData: ApproveDoctorPayload = {
      doctorId: selectedId,
      verificationStatus: status,
      rejectionReason: rejectionReason,
    };
    verify(reviewData, {
      onSuccess: () => {
        console.log("Doctor verified successfully");
        handleClose();
      },
      onError: (error) => {
        console.error("Error verifying doctor:", error);
      },
    });
  };

  if (!selectedDoctor) {
    return null;
  }

  return (
    <Sheet open={!!selectedId} onOpenChange={handleClose}>
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
              <Textarea
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter rejection reason..."
              />
              <div className="flex gap-2 w-full">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleReviewAction("REJECTED")}
                  variant="destructive"
                  size="lg"
                  className="w-full"
                  disabled={!rejectionReason}
                >
                  Confirm Rejection
                </Button>
              </div>
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
                onClick={() => handleReviewAction("APPROVED")}
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
