"use client";

import { FcGoogle } from "react-icons/fc";
import {
  loginWithGithub,
  loginWithGoogle,
  logout,
} from "../../lib/auth/authActions";
import { Button } from "@/src/components/ui/button";

export const LoginWithGithubButton = () => {
  return (
      <Button color="primary" variant="outline" type="submit" onClick={async () => {
        await loginWithGithub();
      }
      }>
        Login with GitHub
      </Button>
  );
};

export const LoginWithGoogleButton = () => {
  return (

      <Button
        color="primary"
        variant="outline"
        type="submit"
        className="mt-2 w-full"
        onClick={async () => {
          await loginWithGoogle();
        }
        }
      >
        <FcGoogle className="mr-2 size-5" />
        Login with Google
      </Button>
  );
};

export const LogoutButton = () => {
  return (
      <Button color="primary" variant="default" type="submit" onClick={async () => {
        await logout();
      }
      }>
        Logout
      </Button>
  );
};
