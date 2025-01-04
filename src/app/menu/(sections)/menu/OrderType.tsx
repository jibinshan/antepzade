"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const OrderType = ({
  orderType,
  setOrderType,
}: {
  orderType: string;
  setOrderType: (orderType: string) => void;
}) => {
  return (
    <div className="flex items-center">
      <Button
        className={cn(
          "rounded-[4.375rem] bg-transparent p-0 px-[0.88rem] py-[0.75rem] text-[1rem] font-medium text-[#73716D] hover:bg-[#121212]",
          orderType === "pickup" &&
            "bg-[#121212] text-primary hover:bg-[#111111]",
        )}
        onClick={() => {
          setOrderType("pickup");
        }}
      >
        Pickup
      </Button>
      <Button
        className={cn(
          "rounded-[4.375rem] bg-transparent p-0 px-[0.88rem] py-[0.75rem] text-[1rem] font-medium text-[#73716D] hover:bg-[#121212]",
          orderType === "delivery" &&
            "bg-[#121212] text-primary hover:bg-[#111111]",
        )}
        onClick={() => {
          setOrderType("delivery");
        }}
      >
        Delivery
      </Button>
    </div>
  );
};

export default OrderType;
