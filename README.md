<div align="center">
  <img src="public/images/logo.png" alt="The Droning Company Logo" width="200" />
  <h1>The Droning Company</h1>
  <p><strong>Premier Global Marketplace for Drone Pilots & Aerial Services</strong></p>

[![CI](https://github.com/ermradulsharma/the-droning-company/actions/workflows/ci.yml/badge.svg)](https://github.com/ermradulsharma/the-droning-company/actions)
[![Next.js](https://img.shields.io/badge/Next.js-12.3.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](#license)

</div>

---

## 📖 Introduction

**The Droning Company** is a state-of-the-art platform connecting professional drone pilots with businesses and individuals seeking high-quality aerial photography, videography, and inspection services. This repository contains the frontend implementation built with **Next.js**, designed for high performance, SEO optimization, and a premium user experience.

## ✨ Key Features

- **🎯 Pilot Directory:** Advanced search and filtering for certified drone pilots globally.
- **💼 Job Marketplace:** Integrated platform for posting and applying to aerial service opportunities.
- **📅 Event Management:** FullCalendar integration for tracking industry events and scheduling.
- **💳 Secure Payments:** Seamless checkout flow powered by Stripe.
- **📱 Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.
- **🔍 SEO Optimized:** Dynamic sitemap generation and server-side rendering for maximum visibility.
- **📧 Notifications:** Real-time feedback and toast notifications for user interactions.

## 🚀 Tech Stack

| Category             | Technology                                                                                                      |
| :------------------- | :-------------------------------------------------------------------------------------------------------------- |
| **Framework**        | [Next.js 12](https://nextjs.org/)                                                                               |
| **UI Library**       | [React 17](https://reactjs.org/)                                                                                |
| **Styling**          | [Bootstrap 5](https://getbootstrap.com/), [MUI 5](https://mui.com/), Vanilla CSS                                |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/)                                                                  |
| **Forms**            | [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup)                                           |
| **Calendar**         | [FullCalendar](https://fullcalendar.io/)                                                                        |
| **Payments**         | [Stripe](https://stripe.com/)                                                                                   |
| **Utilities**        | [Axios](https://axios-http.com/), [Moment.js](https://momentjs.com/), [Sharp](https://sharp.pixelplumbing.com/) |

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js:** v16.x or v18.x (Recommended)
- **npm:** v8.x or higher

### 1. Clone & Install

```bash
git clone https://github.com/ermradulsharma/the-droning-company.git
cd the-droning-company
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

## 🏗️ Build & Deployment

To create a production-ready build:

```bash
npm run build
npm start
```

This project is optimized for deployment on [Vercel](https://vercel.com/) or any Node.js environment.

## 📂 Project Architecture

```text
├── components/          # Reusable UI components
├── context/             # React Context providers
├── hooks/               # Custom React hooks
├── pages/               # Next.js pages & API routes
├── redux/               # Redux slices & store configuration
├── public/              # Static assets (images, icons, etc.)
├── styles/              # Global and component-specific styles
└── utils/               # Helper functions & constants
```

## 🤝 Contributing

We welcome contributions! Please read our [**CONTRIBUTING.md**](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

Copyright © 2026 The Droning Company. All rights reserved.
This project is proprietary and confidential. Unauthorized copying of this file, via any medium, is strictly prohibited.

---

<div align="center">
  Built with ❤️ by The Droning Company Team
</div>
