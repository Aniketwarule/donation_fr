"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";

interface CampaignCardProps {
  campaign: {
    id: string;
    title: string;
    description: string;
    image: string;
    raised: number;
    goal: number;
    daysLeft: number;
  };
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = (campaign.raised / campaign.goal) * 100;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image
            src={campaign.image}
            alt={campaign.title}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold">{campaign.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {campaign.description}
        </p>
        <Progress value={progress} className="mt-4" />
        <div className="mt-2 flex items-center justify-between text-sm">
          <span>₹{campaign.raised.toLocaleString()} raised</span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="mt-1 text-sm text-muted-foreground">
          {campaign.daysLeft} days left
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/campaign/${campaign.id}`} className="w-full">
          <Button className="w-full">Donate Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}