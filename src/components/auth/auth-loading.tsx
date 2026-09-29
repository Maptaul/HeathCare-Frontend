import { Loader2Icon } from "lucide-react";

export default function AuthLoading({
  label = "Verifying Account",
}: {
  label?: string;
}) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        {label}
      </div>
    </div>
  );
}
