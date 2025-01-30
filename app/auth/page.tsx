"use client";

import {
  LoginWithGithubButton,
  LoginWithGoogleButton,
} from "@/src/components/auth/AuthButtons";
import AuthForm from "@/src/components/auth/AuthForm";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Auth = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col">
          <div className="mx-auto w-full max-w-sm rounded-md px-6 py-4 shadow">
            <div className="mb-4 flex flex-col items-center">
              <img
                src="https://shadcnblocks.com/images/block/block-1.svg"
                alt="logo"
                className="mb-4 h-10 w-auto bg-primary p-1 rounded-full"
              />
              <p className="mb-2 text-2xl font-bold">Shadcnblocks.com</p>
              <p className="text-muted-foreground">
                Sign up in less than 2 minutes.
              </p>
            </div>
            <AuthForm isRegistering={isRegistering} />
            <div className="flex items-center space-x-4 p-4">
              <hr className="border-muted-foreground w-full" />
              <p className="mx-auto">or</p>
              <hr className="border-muted-foreground w-full" />
            </div>
            <LoginWithGoogleButton />
            <LoginWithGithubButton />
          </div>
          <div className="mx-auto flex justify-center gap-1 text-sm text-muted-foreground">
            {isRegistering ? (
              <>
                <p>Déjà un compte ?</p>
                <p
                  className="font-medium text-primary cursor-pointer"
                  onClick={() => setIsRegistering(false)}
                >
                  Se connecter
                </p>
              </>
            ) : (
              <>
                <p>Pas encore de compte ?</p>
                <p
                  className="font-medium text-primary cursor-pointer"
                  onClick={() => setIsRegistering(true)}
                >
                  S’inscrire
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
