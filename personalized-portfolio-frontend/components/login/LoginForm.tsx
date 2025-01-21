"use client";

import { loginHandler } from "@/utils/login";
import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(false);
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const result = await loginHandler({ username, password });
    setLoading(false);

    if (result.success) {
      window.location.href = "/";
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Welcome Back
      </h1>
      <p className="text-sm text-gray-500 mb-4 text-center">
        Please enter your credentials to login
      </p>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} method="POST" className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white rounded-lg font-medium shadow-lg transition duration-200`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Don&#39;t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
