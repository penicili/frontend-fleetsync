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
          };          // Use authService for login
          const response = await authService.login(payload);
          
          // Extract token from response based on the exact structure:
          // { "message": "Login success", "data": { "token": "..." } }
          const token = response.data?.data?.token;
          
          if (token) {
            // Try to decode the JWT to get user data
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
              // If we can't decode the token, just return basic info
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
      // Only update token when user is first authenticated
      if (user) {
        // Store the access token from the backend
        token.accessToken = user.token;
        
        // Store user information
        token.name = user.name;
        token.email = user.email;
        
        // Store any JWT payload data if available
        if (user.userData) {
          token.userData = user.userData;
          // Set expiry based on JWT exp if available
          if (user.userData.exp) {
            token.exp = user.userData.exp;
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add token to session so client can use it
      session.accessToken = token.accessToken;
      
      // Set user information in the session
      if (token.name) session.user.name = token.name;
      if (token.email) session.user.email = token.email;
      
      // Add JWT payload data to the session if available
      if (token.userData) {
        // Add useful JWT payload data to session.user
        session.user.username = token.userData.username || session.user.name;
        session.user.email = token.userData.email || session.user.email;
        
        // Store the token payload data for reference
        session.user.tokenData = token.userData;
      }
      
      return session;
    }
  },
  
  // Only enable debug in development
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);

