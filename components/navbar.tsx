"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Wallet2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { usePathname } from "next/navigation";



export function Navbar() {
  const pathname = usePathname();


  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // TODO: Implement wallet connection
    setIsConnected(true);
  };

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="w-full px-6 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Wallet2 className="h-6 w-6 ml-6" />
          <span className="font-bold ml-2 hover:text-gray-500 transition duration-500 ease-in-out">
            DonateChain
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            href="/campaigns"
            className={`text-sm hover:text-gray-400 font-medium transition duration-500 ease-in-out ${
              pathname === "/campaigns" ? "text-blue-300 font-bold" : ""
            }`}
          >
            Campaigns
          </Link>
          <Link
            href="/create"
            className={`text-sm hover:text-gray-400 font-medium transition duration-500 ease-in-out ${
              pathname === "/create" ? "text-blue-300 font-bold" : ""
            }`}
          >
            Create Campaign
          </Link>
          {isConnected && (
            <Link href="/wallet" className="text-sm font-medium">
              Wallet
            </Link>
          )}
          <Button
            variant={isConnected ? "outline" : "default"}
            onClick={handleConnect}
            className="hover:bg-white hover:text-black transition duration-500 ease-in-out border-2 border-transparent border-black dark:hover:bg-black dark:hover:text-white dark:hover:border-white"
          >
            {isConnected ? "0x1234...5678" : "Connect Wallet"}
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}