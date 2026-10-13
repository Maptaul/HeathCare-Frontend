import { toast } from "@/components/ui/toast";

type ApiError = Error & { data?: { message?: string } };

export const showApiError = (title: string) => (err: ApiError) =>
  toast.add({
    title,
    description: err.data?.message ?? err.message,
    type: "error",
  });
