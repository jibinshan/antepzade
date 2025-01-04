"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { type FC, useEffect, useRef, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRestaurant } from "@/context/RestaurantContext";
import { format } from "date-fns";
import { DayHours, OpenHours } from "@/types/restaurant.type";

const FormSchema = z.object({
  time: z.string(),
  date: z.string(),
});

interface ScheduleTImePopupProps {
  children: React.ReactNode;
  setScheduleTime: (time: z.infer<typeof FormSchema>) => void;
}

type DateObject = {
  id: string;
  dayLabel: string | undefined;
  day: number;
  monthName: string | undefined;
};

const ScheduleTImePopup: FC<ScheduleTImePopupProps> = ({
  children,
  setScheduleTime,
}) => {

  const { restaurant } = useRestaurant();

  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dates, setDates] = useState<DateObject[]>([]);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(12);
  const [select, setSelect] = useState<string>("");
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      time: "",
      date: "",
    },
  });
  const dateValue = form.watch("date");
  const scrollRight = () => {
    if (scrollRef.current) {
      // scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      const currentScrollLeft = scrollRef.current.scrollLeft;
      if (currentScrollLeft === 0) {
        setShowLeftArrow(true);
        setShowRightArrow(false);
      }
    }
  };
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
      const currentScrollLeft = scrollRef.current.scrollLeft;
      if (currentScrollLeft === 287.20001220703125) {
        setShowLeftArrow(false);
        setShowRightArrow(true);
      }
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };
  const getDateLabels = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const result = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      const dayLabel =
        i === 0 ? "Today" : i === 1 ? "Tomorrow" : days[date.getDay()];
      const day = date.getDate();
      const monthName = months[date.getMonth()];
      const id = `${day}-${monthName}-${date.getFullYear()}`;

      result.push({ id, dayLabel, day, monthName });
    }

    return result;
  };

  useEffect(() => {
    setDates(getDateLabels());
  }, []);

  function roundToHourIfNeeded(timeString: string) {
    const [hours, minutes] = timeString.split(":").map(Number);

    // Check if minutes are greater than 45, if so, round up
    if (minutes !== undefined && hours !== undefined) {
      if (minutes > 45) {
        return hours + 1;
      }
      return hours;
    }
  }

  useEffect(() => {
    const opening = (restaurant?.openHours as Partial<OpenHours>) ?? {};
    if (dateValue) {
      const day = format(
        new Date(dateValue),
        "EEEE",
      ).toLowerCase() as keyof OpenHours;
      if (day in opening) {
        const hours = (opening[day] as Partial<DayHours>) ?? {};

        const fromTime: string | undefined = hours.timings?.find(
          (item) => item.from,
        )?.from;
        const toTime: string | undefined = hours.timings?.find(
          (item) => item.to,
        )?.to;
        if (toTime) {
          const to = roundToHourIfNeeded(toTime);
          setTo(Number(to));
        }
        if (fromTime) {
          const from = roundToHourIfNeeded(fromTime);
          setFrom(Number(from));
        }
      }
    } else {
      console.log("Date is invalid or undefined");
    }
  }, [dateValue, restaurant?.openHours]);

  const generateTimeSlots = () => {
    const slots = [];

    if (from < to) {
      for (let hour = from; hour < to; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          // if (hour === 23 && minute > 0) break; // Stop after 10:00 PM
          // const period = hour >= 12 ? "PM" : "AM";
          // const displayHour = hour > 12 ? hour - 12 : hour;
          // const time = `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
          let endMinute = minute + 30;
          let endHour = hour;

          // Handle the overflow for minutes and hours
          if (endMinute >= 60) {
            endMinute -= 60;
            endHour += 1;
          }

          const startTime = `${hour}:${minute.toString().padStart(2, "0")}`;
          const endTime = `${endHour}:${endMinute.toString().padStart(2, "0")}`;

          const time = `${startTime} - ${endTime}`;
          slots.push(time);
        }
      }
    } else {
      for (let hour = from; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          let endMinute = minute + 30;
          let endHour = hour;

          // Handle the overflow for minutes and hours
          if (endMinute >= 60) {
            endMinute -= 60;
            endHour += 1;
          }

          const startTime = `${hour}:${minute.toString().padStart(2, "0")}`;
          const endTime = `${endHour}:${endMinute.toString().padStart(2, "0")}`;

          const time = `${startTime} - ${endTime}`;
          slots.push(time);
        }
      }
      for (let hour = 0; hour < to; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          let endMinute = minute + 30;
          let endHour = hour;

          // Handle the overflow for minutes and hours
          if (endMinute >= 60) {
            endMinute -= 60;
            endHour += 1;
          }

          const startTime = `${hour}:${minute.toString().padStart(2, "0")}`;
          const endTime = `${endHour}:${endMinute.toString().padStart(2, "0")}`;

          const time = `${startTime} - ${endTime}`;
          slots.push(time);
        }
      }
    }
    return slots;
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex max-w-[525px] flex-col gap-6 border-[1px]  bg-[#f3f3f3]">
        <DialogHeader>
          <DialogTitle className="text-black">
            Schedule pick-Up
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-3"
          >
            <div
              className="hidden-scrollbar flex w-full gap-2 overflow-x-scroll "
              ref={scrollRef}
            >
              {dates?.map((date) => {
                return (
                  <div
                    key={date?.id}
                    className={cn(
                      "flex w-fit flex-col items-start justify-center gap-3 border-[2px] border-[#282828] bg-white px-4 py-3",
                      select === date.id && "border-[#bc995d]",
                    )}
                    onClick={() => {
                      setSelect(date.id);
                      form.setValue("date", date.id);
                    }}
                  >
                    <p className="font-semibold text-black">{date.dayLabel}</p>
                    <p className="flex whitespace-nowrap text-xs text-[#7c7468]">
                      {date.day} {date.monthName}
                    </p>
                  </div>
                );
              })}
              {showLeftArrow && (
                <Button
                  className="fixed left-3 top-[85px] rounded-full bg-[#141414] px-2 py-1"
                  variant="ghost"
                  onClick={scrollLeft}
                >
                  <ArrowRight className="rotate-180 transform text-white hover:text-black" />
                </Button>
              )}

              {showRightArrow && (
                <Button
                  className="fixed right-3 top-[85px] rounded-full bg-[#141414] px-2 py-1"
                  variant="ghost"
                  onClick={scrollRight}
                >
                  <ArrowRight className="text-white hover:text-black" />
                </Button>
              )}
            </div>
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="custom-scrollbar flex h-[300px] flex-col gap-3 space-y-1 overflow-y-scroll px-2 py-2"
                    >
                      {generateTimeSlots().map((time) => (
                        <FormItem className="flex items-center justify-between space-y-0" key={time}>
                          <Label className="text-base font-semibold text-black">
                            {time}
                          </Label>
                          <FormControl>
                            <RadioGroupItem value={time} />
                          </FormControl>
                        </FormItem>
                      ))}


                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full flex-col justify-end gap-2">
              <Button
                type="button"
                className="text-base font-medium leading-[80%]"
                onClick={() => {
                  setScheduleTime({
                    time: form.watch("time"),
                    date: form.watch("date"),
                  });
                  setOpen(false);
                }}
              >
                Schedule
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="text-black hover:text-black"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleTImePopup;
