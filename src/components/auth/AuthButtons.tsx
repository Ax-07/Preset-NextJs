"use client"

import { FcGoogle } from "react-icons/fc";
import GithubIcon from "@/src/assets/github-mark/github-mark-white.svg";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import Link from "next/link";
import { AvatarImage } from "@radix-ui/react-avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import userIconSvg from "@/src/assets/faUser.svg";
import { cn } from "@/src/utils/tailwind_cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export const LoginWithGithubButton = () => {
  const router = useRouter();

  return (
    <Button
      color="primary"
      variant="outline"
      type="submit"
      className="mt-2 w-full"
      onClick={async () => {
        await signIn("github");
        router.push("/");
      }}
    >
      <Image
        src={GithubIcon}
        alt="Github logo"
        width={20}
        height={20}
        className="mr-2"
      />
      Login with GitHub
    </Button>
  );
};

export const LoginWithGoogleButton = () => {
  const router = useRouter();

  return (
    <Button
      color="primary"
      variant="outline"
      type="submit"
      className="mt-2 w-full"
      onClick={async () => {
        await signIn("google");
        router.push("/");
      }}
    >
      <FcGoogle className="mr-2 size-5" />
      Login with Google
    </Button>
  );
};

export const LogoutButton = () => {
  const router = useRouter();
  return (
    <Button
      color="primary"
      variant="default"
      type="submit"
      className="w-full"
      onClick={async() => {
       await signOut();
        router.push("/");
      }}
    >
      Logout
    </Button>
  );
};

export const SignInButtons = () => {
  return (
    <Link href="/auth">
      <Button variant="outline" size="sm">
        Log in
      </Button>
    </Link>
  );
};

type AuthButtonsProps = {
  className?: string;
};

export const AuthButtons: React.FC<AuthButtonsProps> = ({ className }) => {
  const { data: session } = useSession(); console.log(session);

  if (!session?.user) {
    return <SignInButtons />;
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Avatar className="size-9 items-center justify-center ">
            {session.user.image ? (
              <>
                <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                <AvatarImage
                  src={session.user.image}
                  alt={`${session.user.name ?? "-"}'s profile picture`}
                />
              </>
            ) : (
              <Image src={userIconSvg} alt="User icon" className="size-6" />
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>Bonjour! {session.user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
