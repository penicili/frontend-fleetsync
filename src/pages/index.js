import Home from "@/components/views/Home";
import HomeAuthenticated from "@/components/views/Home/HomeAuthenticated";
import { useSession } from 'next-auth/react';

export default function IndexPage() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }
  
  return session ? <HomeAuthenticated session={session} /> : <Home />;
}
