"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { MessageSquare, UploadCloud, Bot, Loader2 } from "lucide-react";
import { processPdfFile } from "@/app/upload/actions";

export function Navbar() {
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadMessage(null);

    try {
      const formData = new FormData();
      formData.append("pdf", file);
      const result = await processPdfFile(formData);

      setUploadMessage(
        result.success
          ? { type: "success",text: result.message || "PDF processed successfully" }
          : { type: "error", text: result.error || "Failed to process PDF" },
      );
    } catch {
      setUploadMessage({
        type: "error",text: "An error occurred while processing the PDF" });
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-foreground tracking-tight transition-opacity"
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

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="sr-only"
            aria-label="Choose a PDF to upload"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-150 hover:bg-muted hover:text-foreground disabled:cursor-wait disabled:opacity-70"
          >
            {isUploading ? <Loader2 className="animate-spin" /> : <UploadCloud />}
            <span>{isUploading ? "Processing..." : "Upload PDF"}</span>
          </button>
        </nav>
      </div>
      {uploadMessage && (
        <p
          role="status"
          className={`mx-auto max-w-6xl px-4 pb-2 text-sm sm:px-6 ${
            uploadMessage.type === "error" ? "text-destructive" : "text-primary"
          }`}
        >
          {uploadMessage.text}
        </p>
      )}
    </header>
  );
}
