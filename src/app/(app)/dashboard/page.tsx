// Mark this component for client-side rendering
"use client";

// Import necessary hooks and components from React and other libraries
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from '@/store/auth';
import { useToast } from "@/hooks/use-toast";

/**
 * A modal component that allows users to add credits to their account.
 * It provides quick options and a custom input for the amount.
 */
function AddCreditsModal() {
  // State to hold the amount to be added
  const [amount, setAmount] = useState('');
  // Function to add credits from the authentication store
  const addCredits = useAuthStore((state) => state.addCredits);
  // Hook to display toast notifications
  const { toast } = useToast();

  /**
   * Handles the process of adding credits.
   * It parses the amount, calls the addCredits function, and shows a success toast.
   */
  const handleAddCredits = () => {
    // Parse the amount string to a number, removing any currency symbols
    const numericAmount = parseInt(amount.replace(/₹/g, ''), 10);
    // Check if the parsed amount is a valid number
    if (!isNaN(numericAmount)) {
      // Add the credits to the user's account
      addCredits(numericAmount);
      // Show a success notification
      toast({
        title: "Success!",
        description: "Credits added to your account.",
      });
      // Reset the amount input field
      setAmount('');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Credits</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Credits</DialogTitle>
          <DialogDescription>
            Select a quick amount or enter a custom value.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Quick amount selection buttons */}
          <div className="flex justify-around">
            <Button variant="outline" onClick={() => setAmount('2000')}>₹2000</Button>
            <Button variant="outline" onClick={() => setAmount('5000')}>₹5000</Button>
            <Button variant="outline" onClick={() => setAmount('10000')}>₹10000</Button>
          </div>
          {/* Custom amount input with currency symbol */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">₹</span>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-7"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddCredits}>Confirm & Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * The main dashboard page component.
 * It displays user's credit information and provides an option to add more credits.
 */
export default function DashboardPage() {
  // State to manage the loading status of the dashboard data
  const [loading, setLoading] = useState(true);
  // Destructure state values from the authentication store
  const { credits, spentThisMonth, activeThreads } = useAuthStore();

  // Effect to simulate loading data on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400); // 300-500ms skeleton as per requirements
    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-8">
      {/* Conditional rendering based on the loading state */}
      {loading ? (
        // Display skeleton loaders while data is being fetched
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      ) : (
        // Display the actual data cards once loading is complete
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Current Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{credits}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Spent this month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{spentThisMonth}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Threads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{activeThreads}</p>
            </CardContent>
          </Card>
        </div>
      )}
      {/* Section to add more credits */}
      <div className="mt-8">
        <AddCreditsModal />
      </div>
    </div>
  );
}