import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma/prisma";

function getNextMidnightTimestamp() {
  const now = new Date();
  const nextMidnight = new Date(now);
  nextMidnight.setUTCHours(24, 0, 0, 0); // Next midnight UTC
  return Math.floor(nextMidnight.getTime() / 1000);
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        // Use upsert to create or update user and ensure role is CLIENT
        const dbUser = await prisma.user.upsert({
          where: { email: user.email as string },
          update: {
            name: user.name || undefined,
          },
          create: {
            email: user.email as string,
            name: user.name || "No Name",
            role: "CLIENT", // Always set new users as CLIENT
          },
        });

        token.id = dbUser.id;
        token.role = dbUser.role;
      }

      if (token.role === "STAFF" || token.role === "SECRETARY") {
        token.exp = getNextMidnightTimestamp();
      } else {
        const now = Math.floor(Date.now() / 1000);
        token.exp = now + 60 * 60 * 24 * 30;
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
