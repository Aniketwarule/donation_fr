"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, Copy, LogOut } from "lucide-react";
import { useState } from "react";

// Mock data
const donations = [
  {
    id: "1",
    campaign: "Clean Water Initiative",
    amount: 1000,
    date: "2024-02-20",
    txHash: "0x1234...5678",
  },
  {
    id: "2",
    campaign: "Education for All",
    amount: 500,
    date: "2024-02-18",
    txHash: "0x8765...4321",
  },
];

const withdrawals = [
  {
    id: "1",
    campaign: "Clean Water Initiative",
    amount: 30000,
    status: "pending",
    date: "2024-02-21",
  },
  {
    id: "2",
    campaign: "Education for All",
    amount: 20000,
    status: "completed",
    date: "2024-02-19",
  },
];

export default function WalletPage() {
  const [address] = useState("0x1234...5678");
  const [balance] = useState(5000);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
  };

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
                  <code className="rounded bg-muted px-2 py-1">{address}</code>
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
                <p className="text-2xl font-bold">₹{balance.toLocaleString()}</p>
              </div>
              <Button variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect Wallet
              </Button>
            </div>
          </Card>

          {/* Transactions */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="donations">
              <TabsList>
                <TabsTrigger value="donations">My Donations</TabsTrigger>
                <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              </TabsList>

              <TabsContent value="donations" className="mt-4">
                <div className="space-y-4">
                  {donations.map((donation) => (
                    <Card key={donation.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{donation.campaign}</h3>
                          <p className="text-sm text-muted-foreground">
                            {donation.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{donation.amount}</p>
                          <a
                            href="#"
                            className="flex items-center text-sm text-primary hover:underline"
                          >
                            {donation.txHash}
                            <ArrowUpRight className="ml-1 h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="withdrawals" className="mt-4">
                <div className="space-y-4">
                  {withdrawals.map((withdrawal) => (
                    <Card key={withdrawal.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{withdrawal.campaign}</h3>
                          <p className="text-sm text-muted-foreground">
                            {withdrawal.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ₹{withdrawal.amount.toLocaleString()}
                          </p>
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                              withdrawal.status === "completed"
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            }`}
                          >
                            {withdrawal.status}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}