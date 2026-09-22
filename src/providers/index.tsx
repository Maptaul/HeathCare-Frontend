"use client";
import { ReactNode } from "react";
import QueryProvider from "./QueryProvider";
import GoogleAuthProvider from "./google-auth.provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleAuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </GoogleAuthProvider>
  );
}
