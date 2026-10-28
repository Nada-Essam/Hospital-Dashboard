"use client";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

export default function Layout({ children }) {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const currentUser = localStorage.getItem("CurrentUser");

    if (!currentUser) {
      router.replace("/login");
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-gray-900 opacity-50 z-0"
          />
        )}

        <Sidebar sidebarOpen={sidebarOpen} />

        {children}
      </div>
    </div>
  );
}