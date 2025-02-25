"use client";

import { useState } from "react";
import { ContactSection } from '@/types/homepage'

interface FormData {
  name: string,
  company: string,
  email: string,
  message: string,
  contact_me_by_fax_only: boolean,
  branding: boolean,
  web: boolean,
  social: boolean,
}

export default function ContactForm(data: ContactSection) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    company: "",
    contact_me_by_fax_only: false,
    branding: false,
    web: false,
    social: false,
  });

  const [status, setStatus] = useState<"loading" | "success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      if (e.target.checked) {
        setFormData({
          ...formData, [e.target.name]: true
        })
      } else {
        setFormData({
          ...formData, [e.target.name]: false
        })
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", company: "", email: "", message: "", contact_me_by_fax_only: false, branding: false, web: false, social: false, });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-lg p-6 bg-white rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="checkbox" name="contact_me_by_fax_only" checked={formData.contact_me_by_fax_only} 
          onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />

          <p>{data.labelservices}</p>

          {data.services.map((service, index) => (
            <div className="flex items-center" key={index}>
              <input className="mr-2 w-5 h-5" type="checkbox" name={service.key} id={service.key} checked={formData[service.key as keyof FormData] as boolean} onChange={handleChange} />
              <label htmlFor={service.key}>{service.title}</label>
            </div>
          ))}
          

          <div>
            <label htmlFor="name">{data.labelname}</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="company">{data.labelcompany}</label><input
              type="text"
              name="company"
              placeholder="Your Company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="email">{data.labelemail}</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="message">{data.labelmessage}</label>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        
        <button
          type="submit"
          className="bg-rose-red py-2 px-5 mx-auto block font-[family-name:var(--font-jersey10)] text-off-white text-3xl rounded-sm shadow-[0px_4px_10px_0px_#270C36]"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : `${data.button}`}
        </button>
      </form>
      {status === "success" && <p className="text-green-500 mt-2">Message sent!</p>}
      {status === "error" && <p className="text-red-500 mt-2">Error sending message.</p>}
    </div>
  );
}
