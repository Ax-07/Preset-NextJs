import React from "react";
import { auth } from "@/src/lib/auth/auth.config";
import { redirect } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { LogoutButton } from "@/src/components/auth/AuthButtons";
import { Table, TableBody, TableCell, TableRow } from "@/src/components/ui/table";

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth");
  }

  return (
    <section className="flex flex-col items-center py-16">
      <div className="container max-w-3xl">
        {/* ✅ Avatar + Nom */}
        <Card className="flex flex-col items-center p-6">
          <Avatar className="size-24">
            <AvatarImage
              src={session?.user?.image || "/images/Default-user-picture.png"}
              alt={`Photo de ${session?.user?.name}`}
            />
            <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <h1 className="mt-4 text-2xl font-bold">
            {session?.user?.name || "Utilisateur inconnu"}
          </h1>
          <p className="text-gray-500">{session?.user?.email}</p>
        </Card>

        {/* ✅ Détails utilisateur */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Informations du profil</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>{session?.user?.name || "Non défini"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>{session?.user?.email || "Non défini"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

          </CardContent>
        </Card>

        {/* ✅ Bouton de déconnexion */}
        <div className="mt-6 flex justify-center">
          <LogoutButton />
        </div>
      </div>
    </section>
  );
}
