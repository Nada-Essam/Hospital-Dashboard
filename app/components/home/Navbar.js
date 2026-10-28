"use client";

import { useState } from "react";
import Link from "next/link";
import { Hospital, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="max-w-6xl mx-auto h-20 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Hospital size={30} className="text-blue-600" />

          <h2 className="text-lg md:text-2xl font-bold text-gray-800">
            CarePlus Hospital
          </h2>
        </Link>

        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>

          <Link href="#about" className="hover:text-blue-600 transition-colors">
            About
          </Link>

          <Link
            href="#services"
            className="hover:text-blue-600 transition-colors"
          >
            Services
          </Link>

          <Link
            href="#contact"
            className="hover:text-blue-600 transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t bg-white shadow-md px-6 py-5">
          <div className="flex flex-col gap-4">
            <Link href="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>

            <Link href="#about" onClick={() => setIsOpen(false)}>
              About
            </Link>

            <Link href="#services" onClick={() => setIsOpen(false)}>
              Services
            </Link>

            <Link href="#contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>

            <hr className="border-gray-200" />

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 text-center"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}