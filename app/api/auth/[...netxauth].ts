import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    // Email/Password authentication
    CredentialsProvider({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        return null;
      },
    }),

    // Google authentication
    GoogleProvider({
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  // Add custom settings if needed

  // You can define custom pages for sign in, sign out, and error handling
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },

  // Define custom callbacks or event handlers if needed
  callbacks: {
    // For example, you can customize the JWT token creation
    /* async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },*/
  },
});
