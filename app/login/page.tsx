"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ImagePlus, Loader, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation"; // Import the router for navigation

export default function CreateCampaignPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    role: "",
    image: null as File | null,
    milestones: [
      { title: "", amount: "" },
      { title: "", amount: "" },
      { title: "", amount: "" },
    ],
  });
  let isPasswordTyping = false;

  const router = useRouter(); // Initialize router
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.title, code: formData.goal }),
      });
  
      const data = await response.json();
      setIsSubmitting(false);
  
      if (data.success) {
        router.push("/"); // Redirect after successful OTP verification
      } else {
        alert("Invalid OTP. Try again.");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      alert("Could not reach the server. Make sure backend is running.");
      setIsSubmitting(false);
    }
  };
  
   const sendOtp = async (e: React.FormEvent) => {
     e.preventDefault();
     setSendingOtp(true);
   
     try {
       const response = await fetch("http://localhost:5000/send-otp", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ email: formData.title }),
       });
   
       if (!response.ok) {
         throw new Error(`HTTP Error! Status: ${response.status}`);
       }
   
       const data = await response.json();
       alert(data.success ? "OTP Sent Successfully!" : "Failed to send OTP: " + data.message);
     } catch (error) {
       console.error("Fetch Error:", error);
       alert("Could not reach the server. Make sure backend is running.");
     } finally {
       setSendingOtp(false);
     }
   };
   
   
  return (
    <main className="flex flex-col items-center justify-center px-4 pt-16 pb-16">
      <Navbar />
      <div className="container max-w-3xl pt-16">
        <h1 className="text-4xl font-bold">Login to your account</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <Card className="p-6">
            <div className="space-y-6">

            <div className="space-y-2">
               <Label htmlFor="role">Role</Label>
               <select
                 id="role"
                 className="border p-2 rounded w-full"
                 value={formData.role}
                 onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                 }
                 required
               >
               <option value="donor">Donor</option> 
               <option value="ngo">NGO</option>
               </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Email</Label>
                <Input
                  id="title"
                  placeholder="For eg: abc@gmail.com"
                  type="email"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
               <div onClick={sendOtp} >
              <Button type="submit" size="lg" disabled={sendingOtp}>
                    {sendingOtp ? (
                    <>
                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                         Sending OTP...
                    </>
                    ) : (
                    "Send OTP"
                    )}
               </Button>
               </div>

              <div className="space-y-2">
                <Label htmlFor="goal">OTP</Label>
                <Input
                  id="goal"
                  placeholder="Enter OTP"
                  value={formData.goal}
                  onChange={(e) =>
                    setFormData({ ...formData, goal: e.target.value })
                  }
                />
                {isPasswordTyping && (
                        <button className="ml-4 text-gray-700">
                        </button>
                      )}
              </div>
            </div>
          </Card>
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
          </form>
      </div>
    </main>
  );
}