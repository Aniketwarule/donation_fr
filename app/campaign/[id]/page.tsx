"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Clock,
  Users,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

export default function CampaignPage() {
  const router = useRouter();
  const { id } = useParams();
  const [campaignData, setCampaignData] = useState<any>(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [milestones, setMilestones] = useState([]);

  console.log(id)

  useEffect(() => {
    async function fetchCampaign() {
      try {
        const response = await axios.get(`http://localhost:5000/campaigns/${id}`);
        const data = await response.data;
        if (response.data) {
          console.log(data)
          setCampaignData(data);
        } else {
          console.error("Error fetching campaign:", data.error);
        }

        const response2 = await axios.get(`http://localhost:5000/milestones`);
        const data2 = await response2.data;
        if (response2.data) {
          console.log(data2)
          setMilestones(data2);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (id) fetchCampaign();
  }, [id]);

  if (!campaignData) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }
  const img1 = campaignData.imageUrl.split("/")[2];
  const progress = (parseInt(campaignData.raised || "0") / parseInt(campaignData.goal || "1")) * 100;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="w-full pt-24">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 pl-12 mb-20">
            <div className="p-4 pl-0 rounded-lg shadow-md">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={`http://localhost:5000/uploads/${img1}`}
                  alt={campaignData.title}
                  fill
                  className="object-cover"
                />
              </div>
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
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="milestones">Donors</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <p className="text-muted-foreground">
                  {campaignData.description}
                </p>
              </TabsContent>

              <TabsContent value="milestones">
                <div className="space-y-4">
                  {milestones.map((milestone: any, index: number) => (
                    milestone.campaignId === campaignData.id && (
                    <Card key={index} className="p-4 border-2 border-transparent hover:border-gray-300">
                      <div className="flex items-center justify-between ">
                        <div>
                          <p className="font-medium">{milestone.title}</p>
                          <p className="text-sm text-muted-foreground">₹{milestone.amount}</p>
                        </div>
                        {milestone.status === "completed" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                    </Card>
                    )
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="about">

                <p className="text-muted-foreground">
                  {campaignData.description}
                </p>
                
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    ₹{parseInt(campaignData.raised || "0").toLocaleString()} raised
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    of ₹{parseInt(campaignData.goal || "1").toLocaleString()} goal
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
                  <Button className="w-full bg-green-300" size="lg">
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
