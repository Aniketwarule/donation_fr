"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { contract } from "@/lib/contract";
import { ArrowUpRight, Copy, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { useAccount, useBalance, useReadContract } from "wagmi";

export default function WalletPage() {
  const { address, isConnected } = useAccount();

  // ✅ Ensure component only runs on the client
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Read contract donations
  const { data: donations, isLoading: donationsLoading } = useReadContract({
    address: contract.address as `0x${string}`, // ✅ Cast to `0x${string}` to avoid TS error
    abi: contract.abi,
    functionName: "getUserDonations",
    args: [address as `0x${string}`],
  });

  console.log(donations)

  // ✅ Get wallet balance
  const { data: balance } = useBalance({
    address: isClient ? address : undefined,
  });

  // ✅ Prevent undefined balance errors
  const eths = balance?.value ? formatEther(balance.value) : "0.00";

  const copyAddress = () => {
    if (address) navigator.clipboard.writeText(address.toString());
  };

  if (!isClient) return null; // ✅ Prevent SSR hydration mismatch

  if (!isConnected) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>No wallet connected</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-24">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Wallet Info */}
          <Card className="p-6 lg:col-span-1">
            <h2 className="text-xl font-semibold">Wallet</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <div className="mt-1 flex items-center gap-2">
                  <code className="rounded bg-muted px-2 py-1">{address || "N/A"}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={copyAddress}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-2xl font-bold">{eths} ETH</p>
              </div>
              <Button variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect Wallet
              </Button>
            </div>
          </Card>

          {/* Display Donations */}
          <div className="lg:col-span-2">
            <p className="text-sm text-muted-foreground">All Donations</p>
            {donationsLoading ? (
              <p>Loading donations...</p>
            ) : donations ? (
              <ul>
                amount: {donations[0] / 1000000000000000000}
                <br />
                Campaign Name: {donations[1]}
                <br />
                NGO Address: {donations[2]}
                <br />
                <br />
              </ul>
            ) : (
              <p>No donations found.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
