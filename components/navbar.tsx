"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Wallet2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Navbar() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // TODO: Implement wallet connection
    setIsConnected(true);
  };

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Wallet2 className="h-6 w-6" />
          <span className="font-bold">DonateChain</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link href="/campaigns" className="text-sm font-medium">
            Campaigns
          </Link>
          <Link href="/create" className="text-sm font-medium">
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
          >
            {isConnected ? "0x1234...5678" : "Connect Wallet"}
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}