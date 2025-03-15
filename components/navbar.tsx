"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Wallet2, LogOut } from "lucide-react";
import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function Navbar() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

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
              isConnected && location.pathname === "/campaigns" ? "text-blue-300 font-bold" : ""
            }`}
          >
            Campaigns
          </Link>
          <Link
            href="/create"
            className={`text-sm hover:text-gray-400 font-medium transition duration-500 ease-in-out ${
              isConnected && location.pathname === "/create" ? "text-blue-300 font-bold" : ""
            }`}
          >
            Create Campaign
          </Link>
          {isConnected && (
            <Link href="/wallet" className="text-sm font-medium">
              Wallet
            </Link>
          )}

          {/* ✅ Show Wallet Address if Connected, Else Show "Connect Wallet" Button */}
          <Button
            variant={isConnected ? "outline" : "default"}
            onClick={isConnected ? () => disconnect() : () => connect({ connector: connectors[0] })}
            className="hover:bg-white hover:text-black transition duration-500 ease-in-out border-2 border-transparent border-black dark:hover:bg-black dark:hover:text-white dark:hover:border-white"
          >
            {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "Connect Wallet"}
          </Button>

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
