"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center">
        <div className="flex items-center gap-2">
          {/* <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center">
          <span className="text-white text-xl font-bold">C</span>
        </div> */}
          {/* <span className="font-bold text-lg">CYRRQL</span> */}
          <Image
            src="/logo.svg"
            alt="svg logo"
            width={60}
            height={60}
            className="size-fit"
          />
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search Keyword#"
              className="pl-10 pr-4 py-2 rounded-full border border-gray-200 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled
            />
          </div>
        </div>
      </header>

      {/* 404 Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="relative">
            <div className="text-[150px] font-bold text-gray-200 leading-none">
              404
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-4xl">?</span>
            </div>
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">
            Page not found
          </h2>
          <p className="mt-3 text-gray-600">
            We couldn&apos;t find the page you&apos;re looking for. It might
            have been moved, deleted, or never existed.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button className=" px-5 h-4 flex items-center justify-center gap-2">
              <Home className="h-4 w-4" />
              <Link href="/">Go to Home</Link>
            </Button>
            <Button
              // variant="outline"
              className="border border-gray-300 px-5 h-4 flex items-center justify-center gap-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help?{" "}
              <a
                href="mailto:alphaoseghe@gmail.com"
                className="text-blue-600 hover:underline"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Logo Name. All rights reserved.</p>
      </footer>
    </div>
  );
}
