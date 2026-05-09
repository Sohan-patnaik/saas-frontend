"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import Form from "./form/page";
import Navbar from "./components/Navbar";

export default function Example() {
  const { isLoaded, user } = useUser();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>

          {/* Text Section */}
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
              HowYouThink — AI SAAS Platform
            </h2>
            <p className="mt-6 text-lg/8 text-pretty text-gray-300">
              HowYouThink lets you create and train your own AI chatbot. Upload
              your FAQs or documents, customise the tone, and embed it anywhere.
              A smarter way to engage your audience.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              {!isLoaded ? null : user ? (
                // Dashboard button for logged-in users
                <a
                  href="/dashboard"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Go to Dashboard
                </a>
              ) : (
                // Sign-in button for guests
                <a
                  href="https://possible-penguin-65.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
                </a>
              )}
              <a
                href="#"
                className="text-sm/6 font-semibold text-white hover:text-gray-100"
              >
                Learn more
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              alt="HowYouThink app screenshot"
              src="https://imageio.forbes.com/specials-images/imageserve/5e4a3210a854780006b18efa/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds"
              width={1824}
              height={1080}
              className="absolute top-0 left-0 w-228 max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
