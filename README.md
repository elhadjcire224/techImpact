<div align="center">
  <br />
  <div>
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Prisma-black?style=for-the-badge&logoColor=white&logo=prisma&color=2D3748" alt="prisma" />
  </div>

  <h3 align="center">Tech Impact Platform</h3>
</div>

## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## 🤖 Introduction

A Next.js 14 platform focused on connecting tech professionals with impactful projects and opportunities.

## ⚙️ Tech Stack

- Next.js 14
- TypeScript
- Prisma
- PostgreSQL
- TailwindCSS
- NextAuth.js
- Vercel Blob Storage

## 🔋 Features

👉 **Authentication**: Google OAuth integration for secure user login

👉 **Profile Management**: Create and manage professional profiles

👉 **Project Submissions**: Submit and showcase tech projects

👉 **File Upload**: Support for image uploads using Vercel Blob Storage

👉 **Database Integration**: PostgreSQL with Prisma ORM for data management

## 🤸 Quick Start

Follow these steps to set up the project locally.

**Prerequisites**

- Git
- Node.js
- PostgreSQL

**Cloning the Repository**

```bash
git clone https://github.com/your-repo/tech-impact-platform.git
cd tech-impact-platform
```

**Installing Dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

**Setting Up Environment Variables**

Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL=your_postgresql_database_url
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**Running the Development Server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
