import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  contact_me_by_fax_only: boolean;
}

export async function POST(req: Request) {
  try {
    const { name, email, message, contact_me_by_fax_only }: ContactFormData = await req.json();

    if(!contact_me_by_fax_only) {
      if (!name || !email || !message) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL,
        subject: `New Contact Form Submission from ${name}`,
        text: message,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
      });
    }

    

    return NextResponse.json({ success: "Message sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
