'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../(home)/_components/Navbar";
import Title from "@/app/(home)/_components/Title";
import { signup, login } from "@/services/auth";

const Page = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; currentTarget: any; }) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      try {
        if (isLoginActive) {
          const user = await login(email, password);
          console.log("Login successful:", user);
        } else {
          const user = await signup(email, password, name);
          console.log("Signup successful:", user);
        }
        setError(null);
        router.push("/");
      } catch (error: any) {
        setError(error.message);
      }
    } else {
      form.reportValidity();
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="dark:bg-black bg-white dark:bg-grid-white/[0.05] bg-grid-black/[0.2]">
        <div className="max-w-7xl mx-auto p-5">
          <Navbar isFooter={false} />
        </div>
        <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded-md">
          <Title text={isLoginActive ? "Login" : "Signup"} className="mb-6" />
          <form onSubmit={handleSubmit}>
            {!isLoginActive && (
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-customBrownlight"
                />
              </div>
            )}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-customBrownlight"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-customBrownlight"
              />
            </div>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-customBrownlight text-white py-2 rounded-md hover:bg-customBrownlight"
            >
              {isLoginActive ? "Login" : "Signup"}
            </button>
          </form>
          <p
            className="mt-4 text-gray-700 text-center cursor-pointer"
            onClick={() => setIsLoginActive(!isLoginActive)}
          >
            {isLoginActive ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
