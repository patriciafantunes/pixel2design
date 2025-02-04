"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
  contact_me_by_fax_only: boolean;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    contact_me_by_fax_only: false,
  });

  const [status, setStatus] = useState<"loading" | "success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(e.target.name, e.target.value)
    if (e.target.type == 'checkbox') {
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
        setFormData({ name: "", email: "", message: "", contact_me_by_fax_only: false });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="checkbox" name="contact_me_by_fax_only" value={formData.contact_me_by_fax_only} 
          onChange={handleChange} className="hidden" value="1" tabIndex="-1" autoComplete="off" />
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
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
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
