import { format } from "date-fns";
import type { Restaurant } from "@/types/restaurant";

interface Timing {
    from: string;
    to: string;
}

interface DayHours {
    isOpen: boolean;
    timings: Timing[];
}

export const isRestaurantOpen = (restaurant: Restaurant | undefined): boolean => {
    if (!restaurant) return false;

    const currentDay = format(new Date(), "EEEE").toLowerCase() as keyof Restaurant["openHours"];
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    const dayHours = restaurant.openHours[currentDay] as DayHours;

    if (!dayHours?.isOpen) return false;

    return dayHours.timings.some((timing: Timing) => {
        const [fromHour = 0, fromMinute = 0] = timing.from.split(":").map(Number);
        const [toHour = 0, toMinute = 0] = timing.to.split(":").map(Number);

        const fromTimeInMinutes = fromHour * 60 + fromMinute;
        const toTimeInMinutes = toHour * 60 + toMinute;

        return currentTimeInMinutes >= fromTimeInMinutes && currentTimeInMinutes <= toTimeInMinutes;
    });
};
