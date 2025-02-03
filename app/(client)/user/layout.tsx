import { auth } from "@/src/lib/auth/auth.config";
import { redirect } from "next/navigation";
import React from "react";

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/auth");
  }

  return (
    <div>
      {children}
    </div>
  );
}
