import "@/styles/globals.css";
import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { setToken, setUser } from "@/utils/sessionStorage";

// Custom component to handle token storage
const TokenPersistence = ({ children }) => {
  const { data: session } = useSession();
    useEffect(() => {
    if (session?.accessToken) {
      setToken(session.accessToken);
      
      if (session.user) {
        setUser(session.user);
      }
    }
  }, [session]);
  
  return <>{children}</>;
};

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);
  
  return (
    <SessionProvider session={session}>
      <TokenPersistence>
        <Component {...pageProps} />
      </TokenPersistence>
    </SessionProvider>
  );
}
