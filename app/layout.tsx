import React from 'react';
import { Providers } from './providers';
import Layout from '../components/Navigation/Layout';
import Script from 'next/script';
import { GOOGLE_API_KEY } from "../util/Constants";

// Global Styles
import "../styles/sb-admin-2.min.css";
import "../styles/user-style.css";
import "../styles/style.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Home.css";
import "../styles/GearReviews.css";
import "../styles/blog.css";
import "../styles/Registration.css";
import "../styles/cookieconsent.css";

export const metadata = {
  title: 'THE DRONING COMPANY',
  description: 'The Droning Company',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="">
        <Providers>
            <Layout>{children}</Layout>
        </Providers>
        
        {/* Essential Global Scripts */}
        <Script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" strategy="beforeInteractive" />
        <Script strategy="lazyOnload" src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places&loading=async`} />
      </body>
    </html>
  )
}

