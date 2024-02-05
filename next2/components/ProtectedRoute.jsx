import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStore } from "../store/index";

const ProtectedRoute = ({ children }) => {
  const user = useStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // Redirect to login
      router.push("/authpage");
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading indicator
  }

  return <>{children}</>;
};

export default ProtectedRoute;
