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

  const classInputs = "peer placeholder-transparent w-full p-2 border-0 border-b-1 block transition-all focus:outline-0 focus:border-royal-purple"
  const classInputsLabel = "block absolute pointer-events-none transition-all left-0 -top-3.5 text-royal-purple text-bold text-sm peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-royal-purple peer-focus:text-bold peer-placeholder-shown:text-base peer-placeholder-shown:text-dark-purple peer-placeholder-shown:top-2 peer-placeholder-shown:text-bold"

  return (
    <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="checkbox" name="contact_me_by_fax_only" checked={formData.contact_me_by_fax_only} 
          onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />

          <p>{data.labelservices}</p>

          {data.services.map((service, index) => (
            <div className="flex items-center" key={index}>
              <input className="mr-2 w-5 h-5 accent-royal-purple focus:accent-royal-purple" type="checkbox" name={service.key} id={service.key} checked={formData[service.key as keyof FormData] as boolean} onChange={handleChange} />
              <label htmlFor={service.key}>{service.title}</label>
            </div>
          ))}
          

          <div className="relative mt-8">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className={classInputs}
            />
            <label className={classInputsLabel} htmlFor="name">{data.labelname}</label>
          </div>
          <div className="relative mt-8">
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Your Company"
              value={formData.company}
              onChange={handleChange}
              className={classInputs}
            />
            <label className={classInputsLabel} htmlFor="company">{data.labelcompany}</label>
          </div>
          <div className="relative mt-8">
            
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={classInputs}
            />
            <label className={classInputsLabel} htmlFor="email">{data.labelemail}</label>
          </div>
          <div className="relative mt-8">
            <textarea
              name="message"
              id="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className={classInputs}
            />
             <label className={classInputsLabel} htmlFor="message">{data.labelmessage}</label>
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
