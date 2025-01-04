import { z } from "zod";

export const TableBookingValidation = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." })
        .regex(/^[A-Za-z\s]+$/, { message: "Name must only contain letters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z
        .string()
        .min(11, { message: "Phone number must be at least 11 digits." }).max(11, { message: "Phone number should be 11 digits." }),
    guests: z.string().min(1, { message: "Please select number of guests." }),
    date: z.date({ required_error: "Please select a date." }),
    time: z.string().min(1, { message: "Please select a time." }),
    place: z.string().min(1, { message: "Please Select place" }),
    request: z.string().optional(),
});

export type TableFormValues = z.infer<typeof TableBookingValidation>;