"use client";
import CreateScheduleForm from "@/components/forms/create-schedule-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function ScheduleCreateDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>Create Schedule</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Schedule</DialogTitle>
          <DialogDescription>
            Pick a date and time range (same day). Each slot is 20 minutes. New
            schedules start as drafts until you publish them.
          </DialogDescription>
        </DialogHeader>
        <CreateScheduleForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
