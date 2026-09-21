import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  const routes = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About us",
      url: "/about-us",
    },
  ];
  return (
    <header className="w-full h-16 bg-white shadow-md border-b flex items-center justify-center">
      <div className=" flex justify-between items-center w-full max-w-6xl px-4">
        <div> HealthCare</div>
        <nav className="flex items-center">
          {routes.map((route) => (
            <Link key={route.name} href={route.url} className="mx-4">
              {route.name}
            </Link>
          ))}
        </nav>
        <div>
          <Button
            variant="outline"
            render={<Link href="/login">Login</Link>}
            nativeButton={false}
          >
            login
          </Button>
        </div>
      </div>
    </header>
  );
}
