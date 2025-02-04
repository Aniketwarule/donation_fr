"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";

export default function CreateCampaignPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    image: null as File | null,
    milestones: [
      { title: "", amount: "" },
      { title: "", amount: "" },
      { title: "", amount: "" },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement campaign creation
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container max-w-3xl pt-24">
        <h1 className="text-4xl font-bold">Create Campaign</h1>
        <p className="mt-2 text-muted-foreground">
          Start your fundraising campaign and make a difference
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Campaign Title</Label>
                <Input
                  id="title"
                  placeholder="Enter campaign title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your campaign"
                  className="min-h-[150px]"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Fundraising Goal (₹)</Label>
                <Input
                  id="goal"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.goal}
                  onChange={(e) =>
                    setFormData({ ...formData, goal: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Campaign Image</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("image")?.click()}
                  >
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        image: e.target.files?.[0] || null,
                      })
                    }
                  />
                  {formData.image && (
                    <span className="text-sm text-muted-foreground">
                      {formData.image.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold">Milestones</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Define how funds will be released
            </p>

            <div className="mt-6 space-y-4">
              {formData.milestones.map((milestone, index) => (
                <div key={index} className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`milestone-${index}-title`}>
                      Milestone {index + 1} Title
                    </Label>
                    <Input
                      id={`milestone-${index}-title`}
                      placeholder="e.g., Initial Setup"
                      value={milestone.title}
                      onChange={(e) => {
                        const newMilestones = [...formData.milestones];
                        newMilestones[index].title = e.target.value;
                        setFormData({ ...formData, milestones: newMilestones });
                      }}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`milestone-${index}-amount`}>
                      Amount (₹)
                    </Label>
                    <Input
                      id={`milestone-${index}-amount`}
                      type="number"
                      placeholder="Enter amount"
                      value={milestone.amount}
                      onChange={(e) => {
                        const newMilestones = [...formData.milestones];
                        newMilestones[index].amount = e.target.value;
                        setFormData({ ...formData, milestones: newMilestones });
                      }}
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Campaign...
              </>
            ) : (
              "Create Campaign"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}