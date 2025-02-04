"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

// Mock data
const pendingCampaigns = [
  {
    id: "1",
    title: "Clean Water Initiative",
    organizer: "Water For All Foundation",
    goal: 100000,
    submittedAt: "2024-02-20",
  },
  {
    id: "2",
    title: "Education for All",
    organizer: "Learning Trust",
    goal: 150000,
    submittedAt: "2024-02-19",
  },
];

const withdrawalRequests = [
  {
    id: "1",
    campaign: "Clean Water Initiative",
    amount: 30000,
    milestone: "Initial Infrastructure",
    requestedBy: "0x1234...5678",
    date: "2024-02-21",
  },
  {
    id: "2",
    campaign: "Education for All",
    amount: 20000,
    milestone: "Equipment Purchase",
    requestedBy: "0x8765...4321",
    date: "2024-02-19",
  },
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container pt-24">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Manage campaigns and withdrawal requests
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            Admin
          </Badge>
        </div>

        <Tabs defaultValue="campaigns" className="mt-8">
          <TabsList>
            <TabsTrigger value="campaigns">Pending Campaigns</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawal Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="mt-4">
            <div className="space-y-4">
              {pendingCampaigns.map((campaign) => (
                <Card key={campaign.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{campaign.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        by {campaign.organizer}
                      </p>
                      <div className="mt-4 space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Goal:</span> ₹
                          {campaign.goal.toLocaleString()}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Submitted:</span>{" "}
                          {campaign.submittedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="gap-2">
                        <XCircle className="h-4 w-4 text-destructive" />
                        Reject
                      </Button>
                      <Button className="gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="withdrawals" className="mt-4">
            <div className="space-y-4">
              {withdrawalRequests.map((request) => (
                <Card key={request.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{request.campaign}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Milestone: {request.milestone}
                      </p>
                      <div className="mt-4 space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Amount:</span> ₹
                          {request.amount.toLocaleString()}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Requested by:</span>{" "}
                          {request.requestedBy}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Date:</span>{" "}
                          {request.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="gap-2">
                        <XCircle className="h-4 w-4 text-destructive" />
                        Reject
                      </Button>
                      <Button className="gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}