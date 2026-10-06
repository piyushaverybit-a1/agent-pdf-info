"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, UploadCloud, Bot } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-foreground tracking-tight transition-opacity hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10a37f] text-white shadow-xs">
            <Bot  />
          </div>
          <span className="text-base font-semibold">Agent AI</span>
          
        </Link>

        <nav className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/chat"
            className={`flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-150 ${
              pathname === "/chat" || pathname === "/"
                ? "bg-foreground text-background shadow-xs hover:bg-foreground/90"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <MessageSquare />
            <span>Chat</span>
          </Link>

          <Link
            href="/upload"
            className={`flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-150 ${
              pathname === "/upload"
                ? "bg-foreground text-background shadow-xs hover:bg-foreground/90"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <UploadCloud/>
            <span>Upload PDF</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
