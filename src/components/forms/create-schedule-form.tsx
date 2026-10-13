"use client";
import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import { CalendarIcon, LinkIcon } from "lucide-react";
import { useCreateSchedule } from "@/hooks";
import { scheduleSchema } from "@/validation/schedule.validation";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "../ui/toast";
import { useState } from "react";

interface Props {
  onSuccess?: () => void;
}

type ApiError = Error & { data?: { message?: string } };

// date + time are the doctor's local time; toISOString converts to UTC for the API
const toIso = (date: string, time: string) =>
  new Date(`${date}T${time}`).toISOString();

export default function CreateScheduleForm({ onSuccess }: Props) {
  const { mutate: create, isPending } = useCreateSchedule();
  // shown inside the dialog so a failed submit (e.g. 409 date taken) is obvious
  const [serverError, setServerError] = useState("");

  const form = useForm({
    defaultValues: {
      date: "",
      startTime: "",
      endTime: "",
      meetingLink: "",
    },
    validators: {
      onSubmit: scheduleSchema,
    },
    onSubmit: ({ value }) => {
      setServerError("");
      create(
        {
          startDateTime: toIso(value.date, value.startTime),
          endDateTime: toIso(value.date, value.endTime),
          meetingLink: value.meetingLink,
        },
        {
          onSuccess: () => {
            toast.add({
              title: "Success",
              description: "Schedule created successfully.",
              type: "success",
            });
            form.reset();
            onSuccess?.();
          },
          onError: (error: ApiError) => {
            const message = error.data?.message ?? error.message;
            setServerError(message);
            toast.add({
              title: "Error",
              description: message,
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="date">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const selected = field.state.value
              ? new Date(`${field.state.value}T00:00:00`)
              : undefined;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Date</FieldLabel>
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        id={field.name}
                        type="button"
                        variant="outline"
                        className="w-full justify-start text-left font-normal normal-case tracking-normal"
                      />
                    }
                  >
                    <CalendarIcon />
                    {selected ? format(selected, "PPP") : "Select date"}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selected}
                      disabled={{ before: new Date() }}
                      onSelect={(date) => {
                        if (date) {
                          field.handleChange(format(date, "yyyy-MM-dd"));
                          field.handleBlur();
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <div className="grid grid-cols-2 gap-4">
          {(["startTime", "endTime"] as const).map((name) => (
            <form.Field key={name} name={name}>
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      {name === "startTime" ? "Start Time" : "End Time"}
                    </FieldLabel>
                    <Input
                      type="time"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          ))}
        </div>

        <form.Field name="meetingLink">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Meeting Link</FieldLabel>
                <div className="relative">
                  <LinkIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id={field.name}
                    name={field.name}
                    type="url"
                    placeholder="https://meet.google.com/..."
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                    className="h-11 pl-9"
                  />
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {serverError && (
          <p role="alert" className="text-sm text-destructive">
            {serverError}
          </p>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="h-11 w-full text-base font-medium"
        >
          {isPending ? "Creating..." : "Create Schedule"}
        </Button>
      </FieldGroup>
    </form>
  );
}
