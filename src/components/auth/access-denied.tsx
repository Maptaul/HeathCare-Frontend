import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <div>
      <div>
        <ShieldAlert className="mr-2 h-4 w-4 animate-spin" />
        Access Denied
      </div>
      <div>
        <h1>Access Denied</h1>
        <p>
          You do not have permission to access this page.{" "}
          <Link href="/">Please login</Link> to continue.
        </p>
      </div>
    </div>
  );
}
