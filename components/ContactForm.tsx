"use client";

import { useState } from "react";

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

export default function ContactForm() {
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
    console.log(e.target.name, e.target.value)
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

          <p>How can we help?</p>
          <div>
            <input type="checkbox" name="branding" id="branding" checked={formData.branding} onChange={handleChange} />
            <label htmlFor="branding">Branding</label>
          </div>
          <div>
            <input type="checkbox" name="web" id="web" checked={formData.web} onChange={handleChange} />
            <label htmlFor="web">Web Design</label>
          </div>
          <div>
            <input type="checkbox" name="social" id="social" checked={formData.social} onChange={handleChange} />
            <label htmlFor="social">Social Media Content</label>
          </div>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="company"
          placeholder="Your Company"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-rose-red py-2 px-5 mx-auto block font-[family-name:var(--font-jersey10)] text-off-white text-3xl rounded-sm shadow-[0px_4px_10px_0px_#270C36]"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </form>
      {status === "success" && <p className="text-green-500 mt-2">Message sent!</p>}
      {status === "error" && <p className="text-red-500 mt-2">Error sending message.</p>}
    </div>
  );
}
