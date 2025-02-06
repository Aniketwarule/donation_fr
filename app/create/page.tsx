"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { use, useEffect, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

export default function CreateCampaignPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [raised, setRaised] = useState("");
  const [goal, setGoal] = useState("");
  const [daysLeft, setDaysLeft] = useState("");
  const [milestones, setMilestones] = useState([
    { title: "", amount: "" },
    { title: "", amount: "" },
    { title: "", amount: "" },
  ]);

  useEffect(() => {
    setDaysLeft("30");
    setRaised("75000");
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const data1 = {
      title,
      description,
      image,
      raised,
      goal,
      daysLeft,
      milestones,
    };

    console.log(data1);

    try {
      const response = await axios.post("http://localhost:5000/create-campaign", {
        data1,
      });
  
      const data = await response.data;
      if (data.success) {
        alert("Campaign created successfully!");
      } else { 
        alert(data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Error creating campaign");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="flex flex-col items-center justify-center pt-24">
        <div className="w-full max-w-2xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-bold text-primary"
          >
            Create Campaign
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-2 text-lg text-muted-foreground"
          >
            Start your fundraising campaign and make a difference.
          </motion.p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }} // start hidden and slightly down
          whileInView={{ opacity: 1, y: 0 }} // animate to full visibility
          viewport={{ once: true, amount: 0.3 }} // trigger when 30% of the card is visible
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="mt-8 w-full max-w-lg space-y-8 mb-16"
        >
          <Card className="p-6 rounded-lg shadow-md">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="pl-1">
                  Campaign Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter campaign title"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="pl-1">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your campaign"
                  className="min-h-[150px]"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal" className="pl-1">
                  Fundraising Goal (₹)
                </Label>
                <Input
                  id="goal"
                  type="number"
                  placeholder="Enter amount"
                  value={goal}
                  min="1000"
                  onChange={(e) =>
                    setGoal(e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="pl-1">Image Link</Label>
                <Input
                  id="goal"
                  type="text"
                  placeholder="Enter Image URL"
                  value={image}
                  onChange={(e) =>
                    setImage(e.target.value)
                  }
                />
              </div>
            </div>
          </Card>

          <motion.div
            initial={{ opacity: 0, y: 50 }} // start hidden and slightly down
            whileInView={{ opacity: 1, y: 0 }} // animate to full visibility
            viewport={{ once: true, amount: 0.3 }} // trigger when 30% of the card is visible
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Card className="p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-center">Milestones</h2>
              <p className="mt-1 text-sm text-muted-foreground text-center">
                Define how funds will be released
              </p>

              <div className="mt-6 space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor={`milestone-${index}-title`}
                        className="pl-1"
                      >
                        Milestone {index + 1} Title
                      </Label>
                      <Input
                        id={`milestone-${index}-title`}
                        placeholder="e.g., Initial Setup"
                        value={milestone.title}
                        onChange={(e) => {
                          const newMilestones = [...milestones];
                          newMilestones[index].title = e.target.value;
                          setMilestones(newMilestones);
                        }}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`milestone-${index}-amount`}
                        className="pl-1"
                      >
                        Amount (₹)
                      </Label>
                      <Input
                        id={`milestone-${index}-amount`}
                        type="number"
                        placeholder="Enter amount"
                        value={milestone.amount}
                        min="0"
                        onChange={(e) => {
                          const newMilestones = [...milestones];
                          newMilestones[index].amount = e.target.value;
                          setMilestones(newMilestones);
                        }}
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <Button
            type="submit"
            size="lg"
            className="w-full rounded-lg shadow-md text-lg font-medium transition duration-300 hover:bg-primary/90 "
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating Campaign...
              </>
            ) : (
              "Create Campaign"
            )}
          </Button>
        </motion.form>
      </div>
    </main>
  );
}
