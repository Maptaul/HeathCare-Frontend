import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <div>General Dashboard Layout: {children}</div>;
}
