"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { type FC, useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useRestaurant } from "@/context/RestaurantContext";
import { format } from "date-fns";

const FormSchema = z.object({
    time: z.string(),
});

interface ScheduleTime {
    time: string;
    date: string;
}

interface ScheduleTImePopupProps {
    children: React.ReactNode;
    setScheduleTime: (time: ScheduleTime) => void;
    orderType: string;
}

const ScheduleTImePopup: FC<ScheduleTImePopupProps> = ({ children, setScheduleTime, orderType }) => {
    const { restaurant } = useRestaurant();
    const [timeslot, setTimeslot] = useState<string[]>([]);
    const takeawaystarttime = restaurant?.takeAwayWindow.find((item) => item.startTime)?.startTime;
    const takeawayendtime = restaurant?.takeAwayWindow.find((item) => item.startTime)?.endTime;
    const deliverystartime = restaurant?.deliveryWindow.find((item) => item.startTime)?.startTime;
    const deliveryendtime = restaurant?.deliveryWindow.find((item) => item.startTime)?.endTime;
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            time: "",
        },
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log(data);
    };
    function generateTimeSlots(startTime: string, endTime: string, intervalMinutes: number): string[] {
        const timeToMinutes = (time: string): number => {
            const parts = time.split(":");

            const hours = Number(parts[0]);
            const minutes = Number(parts[1]);

            return hours * 60 + minutes;
        };

        const minutesToTime = (minutes: number): string => {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
        };

        const startMinutes = timeToMinutes(startTime);
        const endMinutes = timeToMinutes(endTime);

        const currentDate = new Date();
        const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();

        const minAllowedTime = currentMinutes + 30;

        const timeSlots: string[] = [];

        for (let currentMinutesIter = startMinutes; currentMinutesIter <= endMinutes; currentMinutesIter += intervalMinutes) {
            if (currentMinutesIter > minAllowedTime) {
                timeSlots.push(minutesToTime(currentMinutesIter));
            }
        }

        return timeSlots;
    }
    useEffect(() => {
        const updateTimeslot = () => {
            if (orderType === "delivery") {
                setTimeslot(generateTimeSlots(deliverystartime ?? "00:00", deliveryendtime ?? "00:00", 30));
            } else {
                setTimeslot(generateTimeSlots(takeawaystarttime ?? "00:00", takeawayendtime ?? "00:00", 30));
            }
        };

        updateTimeslot();

        const interval = setInterval(updateTimeslot, 15 * 60 * 1000);

        return () => clearInterval(interval);
    }, [orderType]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="flex max-w-[525px] flex-col gap-6 border-[1px] border-[#212121] bg-[#070707]">
                <DialogHeader>
                    <DialogTitle className="text-[#FBEAD2]">Schedule pick - Up</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-3">
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
                                            {timeslot?.map((time) => (
                                                <FormItem className="flex items-center justify-between space-y-0" key={time}>
                                                    <Label className="text-base font-semibold">{time}</Label>
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
                                        date: format(Date.now(), "yyyy-MM-dd"),
                                    });
                                    setOpen(false);
                                }}
                            >
                                Schedule
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
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
