"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CampaignCardProps {
  campaign: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    raised: number;
    goal: number;
    daysLeft: number;
  };
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = (campaign.raised / campaign.goal) * 100;
  const img1 = campaign.imageUrl.split("/")[2];
  console.log(`D:/100xdev/distriburted-donation/donation_bk/uploads/${img1}`);
  // D:/100xdev/distriburted-donation/donation_bk/uploads/imageUrl-1742050466822-930851744.png

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // start hidden and slightly down
      whileInView={{ opacity: 1, y: 0 }} // animate to full visibility
      viewport={{ once: true, amount: 0.3 }} // trigger when 30% of the card is visible
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <Card className="overflow-hidden flex flex-col h-full pb-5">
        <CardHeader className="p-0">
          <div className="p-6 pt-6">
            <div className="relative aspect-video overflow-hidden rounded-lg">
            <img
                    //src=`D:\100xdev\distriburted-donation\donation_bk\uploads ${img1}`;
                    src={`http://localhost:5000/uploads/${img1}`}
                    alt="External Image"
                    // unoptimized
                    width={300}
                    height={200}
                />
            </div>
          </div>
        </CardHeader>

        {/* Make this section expand to push the button to the bottom */}
        <CardContent className="p-4 flex-grow flex flex-col">
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

          {/* This div ensures the content takes space before the button */}
          <div className="flex-grow"></div>
        </CardContent>

        {/* Keep the button aligned at the bottom */}
        <CardFooter className="p-4 pt-0">
          <Link
            href={`/campaign/${campaign.id}`}
            className="w-full flex justify-center"
          >
            <Button className="w-5/6 hover:bg-green-200">Donate Now</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function CampaignCard2({ campaign }: CampaignCardProps) {
  const progress = (campaign.raised / campaign.goal) * 100;
  const img1 = campaign.imageUrl.split("/")[2];
  console.log(`D:/100xdev/distriburted-donation/donation_bk/uploads/${img1}`);
  // D:/100xdev/distriburted-donation/donation_bk/uploads/imageUrl-1742050466822-930851744.png

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // start hidden and slightly down
      whileInView={{ opacity: 1, y: 0 }} // animate to full visibility
      viewport={{ once: true, amount: 0.3 }} // trigger when 30% of the card is visible
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <Card className="overflow-hidden flex flex-col h-full pb-5">
        <CardHeader className="p-0">
          <div className="p-6 pt-6">
            <div className="relative aspect-video overflow-hidden rounded-lg">
            <img
                    //src=`D:\100xdev\distriburted-donation\donation_bk\uploads ${img1}`;
                    src={`http://localhost:5000/uploads/${img1}`}
                    alt="External Image"
                    // unoptimized
                    width={300}
                    height={200}
                />
            </div>
          </div>
        </CardHeader>

        {/* Make this section expand to push the button to the bottom */}
        <CardContent className="p-4 flex-grow flex flex-col">
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

          {/* This div ensures the content takes space before the button */}
          <div className="flex-grow"></div>
        </CardContent>

        {/* Keep the button aligned at the bottom */}
        <CardFooter className="p-4 pt-0">
          <Link
            href={`/campaign/${campaign.id}`}
            className="w-full flex justify-center"
          >
            <Button className="w-5/6 hover:bg-green-200">Withdraw</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}