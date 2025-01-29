// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/src/lib/auth/authConfig";

export const { GET, POST } = handlers;
