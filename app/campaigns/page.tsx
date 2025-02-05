"use client";

import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useState } from "react";
import { CampaignCard } from "@/components/campaign-card";
import { motion } from "framer-motion";

// Mock data for demonstration
const mockCampaigns = [
  {
    id: "1",
    title: "Clean Water Initiative",
    description: "Providing clean water to rural communities",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&h=400&fit=crop",
    raised: 50000,
    goal: 100000,
    daysLeft: 15,
  },
  {
    id: "2",
    title: "Education for All",
    description: "Supporting underprivileged children's education",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=400&fit=crop",
    raised: 75000,
    goal: 150000,
    daysLeft: 30,
  },
  {
    id: "3",
    title: "Healthcare Access",
    description: "Improving healthcare facilities in remote areas Improving healthcare facilities in remote areas",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop",
    raised: 25000,
    goal: 200000,
    daysLeft: 45,
  },
  {
    id: "4",
    title: "Healthcare Access",
    description: "Improving healthcare facilities in remote areas",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop",
    raised: 25000,
    goal: 200000,
    daysLeft: 45,
  },
];

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="w-full pt-24">
        <div className="flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-bold "
          >
            Active Campaigns
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-2 text-lg text-muted-foreground"
          >
            Every contribution makes a difference. Support a cause that matters
            to you.
          </motion.p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex w-full justify-center">
          <div className="mt-8 flex flex-wrap gap-4 w-6/12 ">
            <div className="flex-1 ">
              <div className="relative ">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                <SelectItem value="verified">Verified Only</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Full-width Campaigns Grid */}
      <div className="w-full px-20 mt-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {mockCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </main>
  );
}
