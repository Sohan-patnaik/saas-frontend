"use client"
import React from "react"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()

  

  return (
    <nav className="bg-blend-color-burn text-white px-6 py-3 shadow-md ">
      <div className="container mx-auto flex justify-between items-center">

        <div className="text-xl font-bold cursor-pointer" onClick={() => router.push("/")}>
          HowYouThink
        </div>
        <div className="flex space-x-6 items-center">
          <button
            className="hover:text-gray-200 transition-colors duration-200"
            onClick={() => router.push("/")}
          >
            Home
          </button>

          <button
            className="hover:text-gray-200 transition-colors duration-200"
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </button>

        </div>
      </div>
    </nav>
  )
}
