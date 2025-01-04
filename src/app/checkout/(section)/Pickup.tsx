import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import { ArrowRight, Calendar, CalendarClock, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/Icon";
import ScheduleTImePopup from "@/components/popups/ScheduleTimePopup";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useRestaurant } from "@/context/RestaurantContext";
import { calculateServiceCharge } from "@/lib/calculate-service-charge";

// interface PickupProps {

// }
const FormValidation = z.object({
  orderType: z.enum(["PICKUP", "DELIVERY"], {
    required_error: "You need to select a order type.",
  }),
  date: z.string().min(3, "please select date"),
  time: z.string().min(2, "please select time"),
  name: z.string().min(2, "please enter name"),
  phone: z.string().min(11, "please enter minimum 11 numbers").max(11, "please enter maximum 11 numbers").regex(/^\d+$/),
  email: z.string().email().min(2, "please enter email"),
});

interface ScheduleTime {
  time: string; // Change to the appropriate type
  date: string; // Change to the appropriate type (e.g., Date, string, etc.)
}

type FormData = z.infer<typeof FormValidation>;
const Pickup = () => {
  const { apiUrl, restaurantID, restaurant } = useRestaurant();
  const { cartValue } = useCart();
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [pickup, setPickUp] = useState<string>("Standard");
  const [scheduleTime, setScheduleTime] = useState<ScheduleTime>({
    time: "",
    date: "",
  });
  const [note, setNote] = useState("");
  const form = useForm<FormData>({
    resolver: zodResolver(FormValidation),
    defaultValues: {},
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const res: AxiosResponse<{
        data: {
          _id: string;
        };
      }> = await axios.post(`${apiUrl}/orders`, {
        _idRestaurant: restaurantID,
        orderType: 3,
        deliveryTime:
          pickup === "Standard"
            ? new Date(Date.now() + 20 * 60000)
            : new Date(`${scheduleTime.date},${scheduleTime.time.split("-")[0]}`),
        description: "Order for " + data.name,
        items: cartItems,
        userDetails: {
          name: data.name,
          email: data.email,
          phone: {
            number: data.phone,
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
    toast("Not Implemented");
    return mutate(data);
  };
  return (
    <div>
      <div className="flex w-full flex-col items-start justify-between gap-3 border-b-[2px] border-primary py-3 pb-5">
        <p className="text-xl font-semibold text-black">Pickup Location</p>
        <div className="flex w-full items-center justify-between gap-1 px-1 py-1">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-[#f8f8f8] px-4 py-4 text-sm text-[#bc995d]">
              <MapPin className="text-primary" />
            </div>
            <div>
              <p className="text-md font-semibold text-black">{restaurant?.name}</p>
              <Link className="text-sm text-[#666666]" href={`https://www.google.com/maps/place/${restaurant?.address?.coords[0]},${restaurant?.address?.coords[1]}`} target="_blank">
                {restaurant?.address?.firstLine}{" "}{restaurant?.address?.secondLine}{' '}{restaurant?.address?.city}{' '}{restaurant?.address?.countryCode}
              </Link>
            </div>
          </div>
          <Link href={`https://www.google.com/maps/place/${restaurant?.address?.coords[0]},${restaurant?.address?.coords[1]}`} target="_blank">
            <p className="rounded-full px-4 py-3 text-sm">
              <ArrowRight className="text-primary" />
            </p>
          </Link>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
          <div className="flex w-full flex-col items-start justify-between gap-3 border-b-[2px] border-primary py-3 pb-5">
            <p className="w-full text-xl font-semibold text-black">Pickup Time</p>
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
                    <p className="text-black">
                      {scheduleTime.date || scheduleTime.time
                        ? `${scheduleTime?.date},${scheduleTime.time} `
                        : "Choose a time"}
                    </p>
                  </div>
                </div>
              </ScheduleTImePopup>
            </div>
            <div className="w-full rounded-lg">
              <div className="z-40 flex w-full flex-col gap-2">
                <Label
                  htmlFor="note"
                  className="flex cursor-pointer items-center gap-2 text-black"
                >
                  <Icons.pencil />
                  Add Note
                </Label>
                <Textarea
                  id="note"
                  placeholder="Write your Note here"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="border-none bg-[#f8f8f8] text-black lg:w-4/5"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-b-[2px] border-b-[#f8f8f8] pb-7 pt-7">
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
                        className="h-12 rounded-none border-b-[3px] border-l-0 border-r-0 border-t-0  bg-[#f8f8f8] text-black outline-none focus-visible:border-b-[2px] focus-visible:border-b-[#bc995d] focus-visible:ring-0"
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
              Place Order
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Pickup;
