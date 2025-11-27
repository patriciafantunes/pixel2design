# Pixel2Design — Portfolio Website

This repository contains the source code for the Pixel2Design website: a modern, fast, and scalable platform built to represent the studio’s identity, services, and digital presence.  
The project was designed to be modular, CMS-driven, and extremely flexible, allowing content updates without touching code — ideal for long-term growth.



## 🎯 Project Summary

The goal of this project is to build a high-performance website for Pixel2Design using a **headless architecture** powered by Sanity as the CMS and Next.js 15 as the frontend framework.  
The platform supports dynamic content, fast rendering, responsive design, and modern SEO standards.

From animations to content rendering and email handling, each part of the project was built with scalability, maintainability, and performance in mind.



## 🧱 Architecture & Approach

### **Headless Architecture**
- **Sanity CMS** manages all structured content: pages, services, portfolio entries and reusable blocks.
- Content is fetched via **GROQ queries** using `next-sanity`, ensuring fast and type-safe data.

### **Modern Frontend**
- Built with **Next.js 15** and **React 19**
- Utilizes **React Server Components**, **App Router**, and **Turbopack**
- Styled with **Tailwind CSS 4** for a consistent and flexible design system
- Fully responsive and optimized for all devices

### **Email & Analytics**
- Contact form powered by **Nodemailer**
- Real-time insights through **Vercel Analytics**



## 🛠 Tech Stack

### **Frontend**
- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- Portable Text rendering (`@portabletext/react`)
- Framer Motion (optional animations)

### **CMS / Backend**
- Sanity CMS (v3)
- GROQ queries
- Sanity Image CDN + `@sanity/image-url`
- `next-sanity` integration

### **Additional Tools**
- Nodemailer
- TypeScript 5
- ESLint 9 + Next.js config
- PostCSS
- Vercel (deployment)
- Turbopack



## 📂 Folder Structure

```text
pixel2design/
│
├── app/                 # Next.js routes, layouts and server components
│
├── components/          # Reusable UI components and sections
│
├── lib/
│   └── sanity/          # Sanity configuration, queries and client
│
├── public/              # Static assets (images, icons, branding)
│
├── types/               # TypeScript types and interfaces
│
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind config
├── postcss.config.mjs   # PostCSS setup
├── middleware.ts        # Middleware (if used)
├── eslint.config.mjs    # Linter configuration
├── tsconfig.json        # TypeScript settings
└── package.json         # Dependencies & scripts
