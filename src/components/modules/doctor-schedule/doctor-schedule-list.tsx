"use client";
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
import {
  useDeleteSchedule,
  usePublishSchedule,
  useSuspenseGetMySchedules,
} from "@/hooks";
import type { ScheduleParams } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { showApiError } from "./show-api-error";

export const SCHEDULE_COLUMNS = [
  "Date",
  "Time",
  "Slots",
  "Meeting Link",
  "Status",
  "Actions",
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { dateStyle: "medium" });
const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString(undefined, { timeStyle: "short" });

interface Props extends ScheduleParams {
  handlePageChange: Dispatch<SetStateAction<number>>;
}

export default function DoctorScheduleList({
  handlePageChange,
  ...params
}: Props) {
  const { data } = useSuspenseGetMySchedules(params);
  const { mutate: publish, isPending: isPublishing } = usePublishSchedule();
  const { mutate: remove, isPending: isDeleting } = useDeleteSchedule();

  const schedules = data.data;

  return (
    <>
      <div className="w-full border rounded-md p-4">
        <Table>
          {schedules.length === 0 && (
            <TableCaption>No schedules found.</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              {SCHEDULE_COLUMNS.map((column) => (
                <TableHead
                  key={column}
                  className={column === "Actions" ? "text-right" : undefined}
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell className="font-medium">
                  {formatDate(schedule.startDateTime)}
                </TableCell>
                <TableCell>
                  {formatTime(schedule.startDateTime)} -{" "}
                  {formatTime(schedule.endDateTime)}
                </TableCell>
                <TableCell>
                  {schedule.availableSlots} / {schedule.totalSlots}
                </TableCell>
                <TableCell>
                  <a
                    href={schedule.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    Join
                  </a>
                </TableCell>
                <TableCell>{schedule.status}</TableCell>
                <TableCell className="text-right space-x-2">
                  {schedule.status === "DRAFT" && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isPublishing}
                      onClick={() =>
                        publish(schedule.id, {
                          onError: showApiError("Publish failed"),
                        })
                      }
                    >
                      Publish
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={isDeleting}
                    onClick={() =>
                      remove(schedule.id, {
                        onError: showApiError("Delete failed"),
                      })
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mt-4">
        <TablePagination
          totalPages={data.meta.totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
}
