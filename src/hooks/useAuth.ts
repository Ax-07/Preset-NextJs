import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const loginWithGithub = async () => {
    await signIn("github");
    router.push("/");
  };

  const loginWithGoogle = async () => {
    await signIn("google");
    router.push("/");
  };

  const logout = async () => {
    await signOut();
    router.push("/");
  };

  return { session, loginWithGithub, loginWithGoogle, logout };
};
