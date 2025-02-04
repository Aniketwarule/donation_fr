"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import {
  Clock,
  Users,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// Mock campaign data
const campaignData = {
  id: "1",
  title: "Clean Water Initiative",
  description: "Providing clean water to rural communities through sustainable infrastructure and community engagement. This project aims to install water purification systems and conduct awareness programs about water conservation.",
  image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&h=400&fit=crop",
  raised: 50000,
  goal: 100000,
  daysLeft: 15,
  donors: 128,
  organizer: "Water For All Foundation",
  transactions: [
    { id: "tx1", donor: "0x1234...5678", amount: 1000, timestamp: "2024-02-20T10:30:00Z" },
    { id: "tx2", donor: "0x8765...4321", amount: 500, timestamp: "2024-02-20T09:15:00Z" },
  ],
  milestones: [
    { title: "Initial Infrastructure", amount: 30000, status: "completed" },
    { title: "Equipment Purchase", amount: 40000, status: "pending" },
    { title: "Implementation", amount: 30000, status: "pending" },
  ],
};

// export async function generateStaticParams() {
//   // Replace this with your actual data fetching logic
//   const campaigns = [{ id: "1" }, { id: "2" }, { id: "3" }]; 

//   return campaigns.map((campaign) => ({
//     id: campaign.id.toString(),
//   }));
// }

export default function CampaignPage({ params }: { params: { id: string } }) {
  const [donationAmount, setDonationAmount] = useState("");
  const progress = (campaignData.raised / campaignData.goal) * 100;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container pt-24">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={campaignData.image}
                alt={campaignData.title}
                fill
                className="object-cover"
              />
            </div>
            
            <h1 className="mt-6 text-3xl font-bold">{campaignData.title}</h1>
            <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {campaignData.daysLeft} days left
              </span>
              <span className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                {campaignData.donors} donors
              </span>
            </div>
            
            <Tabs defaultValue="about" className="mt-8">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-4">
                <p className="text-muted-foreground">{campaignData.description}</p>
              </TabsContent>
              
              <TabsContent value="transactions">
                <div className="space-y-4">
                  {campaignData.transactions.map((tx) => (
                    <Card key={tx.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{tx.donor}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(tx.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{tx.amount}</p>
                          <a
                            href="#"
                            className="text-sm text-primary hover:underline"
                          >
                            View on Explorer
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="milestones">
                <div className="space-y-4">
                  {campaignData.milestones.map((milestone, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{milestone.title}</p>
                          <p className="text-sm text-muted-foreground">
                            ₹{milestone.amount}
                          </p>
                        </div>
                        {milestone.status === "completed" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Donation Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    ₹{campaignData.raised.toLocaleString()} raised
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    of ₹{campaignData.goal.toLocaleString()} goal
                  </p>
                </div>
                
                <Progress value={progress} />
                
                <div className="space-y-4">
                  <Input
                    type="number"
                    placeholder="Enter amount in ₹"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                  <Button className="w-full" size="lg">
                    Donate Now
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Secured by blockchain technology
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}