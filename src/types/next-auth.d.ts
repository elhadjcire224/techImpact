import { DefaultSession } from "next-auth"
import { UserRole } from "./user_roles";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      onboardingCompleted: boolean;
    } & DefaultSession["user"]
  }
}