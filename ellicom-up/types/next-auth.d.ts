import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string; // or you can make this more strict with a union of your roles
    } & DefaultSession["guest"];
  }
}
