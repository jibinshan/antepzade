import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const page = ({}) => {
  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center justify-center">
      <div className="flex aspect-square h-32 w-32 items-center justify-center rounded-full bg-primary p-4">
        <Check size={64} />
      </div>
      <h1 className="mt-4 text-3xl font-bold">Payment Successful</h1>
      <p className="mt-2 text-center text-lg">
        Your payment has been successfully processed. Thank you for your order.
      </p>

      <Button className="mt-4" asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </main>
  );
};

export default page;
