import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import authService from "@/services/auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userIdentifier: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const payload = {
            userIdentifier: credentials.userIdentifier,
            password: credentials.password,
          };          // pake authService buat login
          const response = await authService.login(payload);
          

          const token = response.data?.data?.token;
          
          if (token) {
            // decrypt jwt token jadi user data
            try {
              const base64Payload = token.split('.')[1];
              const payload = Buffer.from(base64Payload, 'base64').toString('utf8');
              const userData = JSON.parse(payload);
              
              return {
                id: userData.username || "user-id",
                token: token,
                name: userData.username || credentials.userIdentifier,
                email: userData.email || credentials.userIdentifier,
                userData: userData
              };
            } catch (e) {
              // callback kalau gagal decrypt jwt token
              return {
                id: "user-id",
                token: token,
                name: credentials.userIdentifier,
                email: credentials.userIdentifier
              };
            }
          }
          return null;
        } catch (error) {
          console.error("Login failed:", error.message);
          throw new Error("Invalid username or password");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  
  // Simplified session handling
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
    callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.name = user.name;
        token.email = user.email;
        
        if (user.userData) {
          token.userData = user.userData;
          if (user.userData.exp) {
            token.exp = user.userData.exp;
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      if (token.name) session.user.name = token.name;
      if (token.email) session.user.email = token.email;
      
      if (token.userData) {
        session.user.username = token.userData.username || session.user.name;
        session.user.email = token.userData.email || session.user.email;
        
        session.user.tokenData = token.userData;
      }
      
      return session;
    }
  },
  
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);

