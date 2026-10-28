"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const schema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .regex(/^\d{10,}$/, "Phone number must contain at least 10 digits"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = (data) => {
    setLoading(true);

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const trimmedEmail = data.email.trim().toLowerCase();

    const userExists = storedUsers.some(
      (user) => user.email.toLowerCase() === trimmedEmail
    );

    if (userExists) {
      alert("User already exists");
      setLoading(false);
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      email: trimmedEmail,
      phone: data.phone.trim(),
      address: data.address.trim(),
      password: data.password,
    };

    const updatedUsers = [...storedUsers, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    reset();
    setLoading(false);

    alert("Account created successfully!");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-zinc-100 to-zinc-300 dark:from-black dark:to-zinc-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-center">
            Create Your Account
          </h1>

          <p className="text-sm text-zinc-500 text-center mb-2">
            Join us and start your journey
          </p>

          <input
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            type="tel"
            placeholder="Phone"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          <input
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            type="text"
            placeholder="Address"
            {...register("address")}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}

          <input
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <input
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 p-3 bg-black text-white rounded-xl hover:bg-zinc-800 disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="text-sm text-center text-zinc-500 mt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-black hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}


