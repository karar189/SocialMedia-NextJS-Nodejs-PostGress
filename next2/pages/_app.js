import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "../components/Navbar";
import "../styles/global.css";

const _App = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "ononline" in window &&
      "onoffline" in window
    ) {
      setIsOnline(window.navigator.onLine);
      if (!window.ononline) {
        window.addEventListener("online", () => {
          setIsOnline(true);
        });
      }
      if (!window.onoffline) {
        window.addEventListener("offline", () => {
          setIsOnline(false);
        });
      }
    }
  }, []);

  const router = useRouter();
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined &&
      isOnline
    ) {
      if (router.route !== "/") {
        const wb = window.workbox;
        wb.active.then((worker) => {
          wb.messageSW({ action: "CACHE_NEW_ROUTE" });
        });
      }
    }
  }, [isOnline, router.route]);

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />

      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default _App;
