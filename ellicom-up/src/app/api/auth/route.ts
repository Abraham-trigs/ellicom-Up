import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    // Add CredentialsProvider here later if you want username/password login
  ],
  session: {
    strategy: "jwt", // Lightweight & stateless sessions
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Add extra user info to the token on sign-in
      if (account && profile) {
        token.id = profile.id;
        token.email = profile.email;
        token.name = profile.name;
        token.picture = profile.picture || null;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass custom properties from token to session
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
