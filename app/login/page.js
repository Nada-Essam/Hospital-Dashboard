"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const schema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

const onSubmit = (data) => {
  setLoading(true);

  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = storedUsers.find(
    (user) =>
      user.email.toLowerCase() === data.email.trim().toLowerCase() &&
      user.password === data.password
  );

  if (!foundUser) {
    alert("Invalid email or password");
    setLoading(false);
    return;
  }

  localStorage.setItem("CurrentUser", JSON.stringify(foundUser));
  setSuccess(true);

  window.setTimeout(() => {
    router.push("/dashboard");
  }, 1000);
};



  return (
    <div className="flex flex-col md:flex-row items-center min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col items-center justify-center mt-10 mb-5 md:m-0 md:w-1/2">
        <Image
          className="rounded-2xl shadow-lg object-cover w-[300px] md:w-[500px] h-auto"
          src="/photo.jpg"
          alt="logo"
          width={400}
          height={400}
        />
      </div>

      <div className="flex flex-col items-center justify-center md:w-1/2 p-10">
        {success && (
          <p className="text-green-500 text-sm -mt-2 mb-2">Login successful!</p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-sm"
        >
          <h1 className="text-3xl font-bold">Welcome Back!</h1>

          <p className="text-sm text-zinc-500 mb-4">
            Login with your details to continue
          </p>

          <input
            className="mb-4 p-3 border rounded-xl bg-white text-black"
            type="email"
            placeholder="Email"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-red-500 text-sm -mt-2 mb-2">
              {errors.email.message}
            </p>
          )}

          <input
            className="mb-4 p-3 border rounded-xl bg-white text-black"
            type="password"
            placeholder="Password"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-red-500 text-sm -mt-2 mb-2">
              {errors.password.message}
            </p>
          )}

          <button
            className="disabled:opacity-60 disabled:cursor-not-allowed p-3 bg-black text-white rounded-xl hover:bg-zinc-800 transition-all cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <p className="text-sm text-zinc-500 text-center hover:underline cursor-pointer">
            Don&apos;t have an account?
            <Link href="/register" className="text-black font-bold">
              {" "}
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
