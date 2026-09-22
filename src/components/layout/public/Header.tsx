"use client";
import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
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

  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();

  const queryClient = useQueryClient();
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logout successful",
          description: "You have been logged out successfully.",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: (err) => {
        toast.add({
          title: "Logout failed",
          description: "An error occurred while trying to log out.",
          type: "error",
        });
        console.error("Logout failed:", err);
      },
    });
  };

  return (
    <header className="w-full h-16 bg-white shadow-md border-b flex items-center justify-center">
      <div className=" flex justify-between items-center w-full max-w-6xl px-4">
        <div className="flex items-center">
          <Logo />
          <span className="ml-2">HealthCare</span>
        </div>
        <nav className="flex items-center">
          {routes.map((route) => (
            <Link key={route.name} href={route.url} className="mx-4">
              {route.name}
            </Link>
          ))}
        </nav>
        <div>
          {!isLoading && !data && (
            <Button
              variant="outline"
              render={<Link href="/login">Login</Link>}
              nativeButton={false}
            >
              login
            </Button>
          )}
          {!isLoading && data && (
            <Button variant="destructive" onClick={handleLogout}>
              logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
