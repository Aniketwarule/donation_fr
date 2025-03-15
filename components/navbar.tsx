"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Wallet2, LogOut } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect(); // ✅ Use available connectors
  const { disconnect } = useDisconnect(); // Disconnect wallet

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (pathname !== "/login") {
      router.push("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    router.push("/login");
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

          {!isLoggedIn ? (
            <Button
              onClick={handleLogin}
              className="group border-2 border-black dark:border-white transition duration-500 ease-in-out hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white"
            >
              Log In
            </Button>
          ) : (
            <>
              <Button
                variant={isConnected ? "outline" : "default"}
                onClick={
                  isConnected
                    ? () => disconnect()
                    : () => connect({ connector: connectors[0] }) // ✅ Connect to first available wallet
                }
                className="hover:bg-white hover:text-black transition duration-500 ease-in-out border-2 border-transparent border-black dark:hover:bg-black dark:hover:text-white dark:hover:border-white"
              >
                {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "Connect Wallet"}
              </Button>

              <Button
                onClick={handleLogout}
                variant="outline"
                className="p-2 rounded-full border hover:border"
              >
                <LogOut
                  strokeWidth={2.5}
                  className="h-5 w-5 text-gray-600 hover:text-red-500"
                />
              </Button>
            </>
          )}

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
