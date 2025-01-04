/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { format } from "date-fns";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name: string;
      email: string;
      phone: string;
      guests: string;
      date: string;
      time: string;
      request: string;
    };
    const { name, email, phone, guests, date, time, request } = body;

    const smtpOptions = {
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    };

    const transporter = nodemailer.createTransport({
      ...smtpOptions,
    });

    const mailOptions = {
      from: `${process.env.EMAIL_FROM_PREFIX} Reservations <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Table Booking By ${name} for ${format(new Date(date), "dd-MM-yyyy")}`,
      html: `
      <h1>Table Reservation from ${name}</h1>
      <br/>
      <p><strong>Name:</strong> ${name}</p>
      <br/>
      <p><strong>Email:</strong> ${email}</p>
      <br/>
      <p><strong>Phone:</strong> ${phone}</p>
      <br/>
      <p><strong>Number of Guest(s):</strong> ${guests}</p>
      <br/>
      <p><strong>Booking Date:</strong> ${format(new Date(date), "dd-MM-yyyy")}</p>
      <br/>
      <p><strong>Booking Time:</strong> ${time}</p>
      <br/>
      <p><strong>Special Request:</strong> ${request || "None"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Booking received successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 },
    );
  }
}
