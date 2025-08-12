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
        // Check if user already exists in DB
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        });

        if (existingUser) {
          // Existing user — preserve role
          token.id = existingUser.id;
          token.role = existingUser.role;
        } else {
          // New user — create with default CLIENT role
          const newUser = await prisma.user.create({
            data: {
              email: user.email as string,
              name: user.name || "No Name",
              role: "CLIENT",
            },
          });
          token.id = newUser.id;
          token.role = newUser.role;
        }
      }

      // Session expiration logic (optional)
      if (token.role === "STAFF" || token.role === "SECRETARY") {
        token.exp = getNextMidnightTimestamp();
      } else {
        const now = Math.floor(Date.now() / 1000);
        token.exp = now + 60 * 60 * 24 * 30; // 30 days
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
