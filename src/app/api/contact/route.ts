/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name: string;
      phone: string;
      email: string;
      reason: string;
      message: string;
    };
    const { name, email, phone, reason, message } = body;

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
      from: `${process.env.EMAIL_FROM_PREFIX} Contact <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: "New Contact Form Submission",
      text: `
        New Contact Form Submission:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Reason: ${reason}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Form Submitted" }, { status: 200 });
  } catch (error) {
    console.error("Form error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 },
    );
  }
}
