"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar({ sidebarOpen , setSidebarOpen}) {
  const links = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Doctors", href: "/dashboard/doctors" },
    { title: "Patients", href: "/dashboard/patients" },
    { title: "Appointments", href: "/dashboard/appointments" },
    { title: "Prescriptions", href: "/dashboard/prescriptions" },
  ];

  const router = useRouter();

  function signOut() {
    localStorage.removeItem("CurrentUser");
    router.push("/login");
  }

  function deleteAccount() {
    const currentUser = JSON.parse(
      localStorage.getItem("CurrentUser")
    );

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const confirmDelete = confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    const updatedUsers = users.filter(
      (user) => user.id !== currentUser.id
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("CurrentUser");

    router.push("/login");
  }

  return (
    <aside
      className={`${
        sidebarOpen ? "flex" : "hidden"
      } absolute z-10 md:static md:flex h-full w-64 bg-gray-100 border-r flex-col justify-between`}
    >
      <div>
        <h1 className="text-xl font-bold text-blue-600 px-6 py-5">
          CarePlus Hospital
        </h1>

        <ul className="flex flex-col gap-2 px-4 mt-6 text-gray-700">
          {links.map((link) => (
            <li key={link.title}>
              <Link
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-blue-100"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-4 py-6">
        <button
          onClick={signOut}
          className="w-full px-4 py-2 rounded-lg text-red-500 hover:bg-red-100 transition"
        >
          Logout
        </button>

        <button
          onClick={deleteAccount}
          className="w-full px-4 py-2 rounded-lg text-blue-500 hover:bg-blue-100 transition"
        >
          Delete Account
        </button>
      </div>
    </aside>
  );
}