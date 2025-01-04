import { Icons } from "@/components/Icon";
import ScheduleTImePopup from "@/components/popups/ScheduleTimePopup";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { useRestaurant } from "@/context/RestaurantContext";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import { Calendar, CalendarClock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { calculateServiceCharge } from "@/lib/calculate-service-charge";
import toast from "react-hot-toast";
import { z } from "zod";

const FormValidation = z.object({
  name: z.string().min(2, "please enter name"),
  phone: z.string().min(11, "please enter minimum 11 numbers").max(11, "please enter maximum 11 numbers").regex(/^\d+$/),
  email: z.string().email().min(2, "please enter email"),
  address: z.string().min(2, "please enter address"),
  city: z.string().min(2, "please enter city"),
  pinCode: z.string().min(2, "please enter pincode"),
  notes: z.string().optional(),
});

interface ScheduleTime {
  time: string; // Change to the appropriate type
  date: string; // Change to the appropriate type (e.g., Date, string, etc.)
}

type FormData = z.infer<typeof FormValidation>;

const Delivery = () => {
  const { apiUrl, restaurantID, restaurant } = useRestaurant();
  const router = useRouter();
  const { cartValue } = useCart();
  const { cartItems, clearCart } = useCart();
  const [pickup, setPickUp] = useState<string>("Standard");
  const [scheduleTime, setScheduleTime] = useState<ScheduleTime>({
    time: "",
    date: "",
  });
  const form = useForm<FormData>({
    resolver: zodResolver(FormValidation),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const res: AxiosResponse<{
        data: {
          _id: string;
        };
      }> = await axios.post(`${apiUrl}/orders`, {
        _idRestaurant: restaurantID,
        orderType: 2,
        deliveryTime:
          pickup === "Standard"
            ? new Date(Date.now() + 20 * 60000)
            : new Date(`${scheduleTime.date},${scheduleTime.time.split("-")[0]}`),
        description: "Order for " + data.name,
        items: cartItems,
        notes: data.notes,
        userDetails: {
          name: data.name,
          email: data.email,
          phone: {
            number: data.phone,
          },
          address: {
            shipping: {
              address: data.address,
              pincode: data.pinCode,
              city: data.city,
            },
            billing: {
              address: data.address,
              pincode: data.pinCode,
              city: data.city,
            },
          },
        },
        // New Additions
        tip: 0,
        serviceCharge: calculateServiceCharge(
          cartValue(),
          restaurant?.serviceCharge ?? 0,
        ),
        preview: false,
      });

      return res.data.data;
    },
    onSuccess: (data) => {
      toast("Order created successfully");
      clearCart();
      router.push("/payment/" + data._id);
    },
    onError: () => {
      toast.error("Please clear your cart and try again");
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
          <div className="flex flex-col gap-4 border-b-[2px] border-b-[#131313] pb-7 pt-7">
            <div className="w-full lg:w-2/6">
              <p className="text-lg font-semibold text-black">Delivery Address</p>
            </div>
            <div className="flex w-full flex-col gap-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-4/5">
                    <FormControl>
                      <Input
                        placeholder="Building/House/flat No/floor"
                        {...field}
                        className="h-12 rounded-none border-b-[3px] border-l-0 border-r-0 border-t-0 bg-[#f8f8f8] text-black outline-none focus-visible:border-b-[2px] focus-visible:border-b-[#bc995d] focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-4/5">
                    <FormControl>
                      <Input
                        placeholder="City"
                        {...field}
                        className="h-12 rounded-none border-b-[3px] border-l-0 border-r-0 border-t-0 bg-[#f8f8f8] text-black outline-none focus-visible:border-b-[2px] focus-visible:border-b-[#bc995d] focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pinCode"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-4/5">
                    <FormControl>
                      <Input
                        placeholder="Pin code"
                        {...field}
                        className="h-12 rounded-none border-b-[3px] border-l-0 border-r-0 border-t-0 bg-[#f8f8f8] text-black outline-none focus-visible:border-b-[2px] focus-visible:border-b-[#bc995d] focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-2">
                    <FormLabel className="flex cursor-pointer items-center gap-2 text-black">
                      <Icons.pencil className="text-black" />
                      Add Note
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        className="border-none bg-[#f8f8f8] text-black lg:w-4/5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-between gap-3 border-b-[2px] border-primary py-3 pb-5">
            <p className="w-full text-xl font-semibold text-black">Delivery Time</p>
            <div className="flex w-full flex-col gap-3 px-1 py-1">
              <div
                className={cn(
                  "flex w-full items-center gap-3 border-[2px] border-[#282828] px-4 py-3 lg:w-2/3",
                  pickup === "Standard" && "border-primary",
                )}
                onClick={() => setPickUp("Standard")}
              >
                <Calendar className="text-primary" />
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-black">Standard</p>
                  <p className="text-[#666666]">10-20 min</p>
                </div>
              </div>
              <ScheduleTImePopup setScheduleTime={setScheduleTime}>
                <div
                  className={cn(
                    "flex w-full items-center gap-3 border-[2px] border-[#282828] px-4 py-3 lg:w-2/3",
                    pickup === "Schedule" && "border-primary",
                  )}
                  onClick={() => setPickUp("Schedule")}
                >
                  <CalendarClock className="text-primary" />
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-black">Schedule</p>
                    <p className="text-[#666666]">
                      {scheduleTime.date || scheduleTime.time
                        ? `${scheduleTime?.date},${scheduleTime.time} `
                        : "Choose a time"}
                    </p>
                  </div>
                </div>
              </ScheduleTImePopup>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-b-[2px] border-b-primary pb-7 pt-7">
            <div className="w-full lg:w-2/6">
              <p className="text-lg font-semibold text-black">Contact Details</p>
            </div>
            <div className="flex w-full flex-col gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-4/5">
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        className="h-12 rounded-none border-b-[3px] border-l-0 border-r-0 border-t-0 bg-[#f8f8f8] text-black outline-none focus-visible:border-b-[2px] focus-visible:border-b-[#bc995d] focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-4/5">
                    <FormControl>
                      <Input
                        placeholder="Phone Number"
                        {...field}
                        className="h-12 rounded-none border-b-[3px] border-l-0 border-r-0 border-t-0 bg-[#f8f8f8] text-black outline-none focus-visible:border-b-[2px] focus-visible:border-b-[#bc995d] focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full lg:w-4/5">
                    <FormControl>
                      <Input
                        placeholder="Email ID"
                        {...field}
                        className="h-12 rounded-none border-b-[3px] border-l-0 border-r-0 border-t-0 bg-[#f8f8f8] text-black outline-none focus-visible:border-b-[2px] focus-visible:border-b-[#bc995d] focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex w-full flex-col pt-7 lg:w-4/5 lg:flex-row">
            <div className="/6 w-full lg:w-2"></div>
            <Button className="h-11 w-full bg-primary font-semibold"
              disabled={isPending}
            >
              Place Delivery Order
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Delivery;
