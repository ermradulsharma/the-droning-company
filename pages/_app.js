import { useEffect } from "react";
import Script from "next/script";
import Head from "next/head";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import "../styles/sb-admin-2.min.css";
import "../styles/user-style.css";
import "../styles/style.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContextProvider } from "../context/ToastContext";
import { UserContextProvider } from "../context/UserContext";
import { CommonFunctionContextProvider } from "../context/CommonFunctionContext";
import { ConfirmProvider } from "material-ui-confirm";
import Layout from "../components/Navigation/Layout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
//import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Home.css";
import "../styles/GearReviews.css";
import "../styles/blog.css";
import "../styles/Registration.css";
import dynamic from "next/dynamic";

import "../styles/cookieconsent.css";

import { GOOGLE_API_KEY } from "../util/Constants";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  /* useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []); */
  return (
    <Provider store={store}>
      {" "}
      <Head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        <meta
          name="facebook-domain-verification"
          content="3t3ty9zswecwk98ceg4o7bu1lz3zsi"
        />
        <meta name="google-adsense-account" content="ca-pub-8937256325792237" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "The Droning Company",
              "url": "https://www.thedroningcompany.com/",
              "logo": "https://www.thedroningcompany.com/images/logo.png",
              "alternateName": "TheDroningCompany.com",
              "sameAs": [
                "https://www.facebook.com/TheDroningCompany",
                "https://www.instagram.com/thedroningcompany/",
                "https://twitter.com/droningcompany"
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "",
                  "contactType": "customer service",
                  "email": "info@thedroningcompany",
                  "availableLanguage": "en"
                }
              ]
            }
            `,
          }}
        ></script>

        <script
          type="text/plain"
          data-cookiecategory="analytics"
          dangerouslySetInnerHTML={{
            __html: `
            window._tfa = window._tfa || [];
            window._tfa.push({notify: 'event', name: 'page_view', id: 1567833});
            !function (t, f, a, x) {
                   if (!document.getElementById(x)) {
                      t.async = 1;t.src = a;t.id=x;f.parentNode.insertBefore(t, f);
                   }
            }(document.createElement('script'),
            document.getElementsByTagName('script')[0],
            '//cdn.taboola.com/libtrc/unip/1567833/tfa.js',
            'tb_tfa_script');
            `,
          }}
        ></script>

      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        // strategy="afterInteractive"
        strategy="lazyOnload"
        type="text/plain"
        data-cookiecategory="analytics"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        // strategy="afterInteractive"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtag.GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />
      {/* end google analytics */}
      {/* Meta Pixel Code */}
      <Script
        id="meta-pixel"
        dangerouslySetInnerHTML={{
          __html: `
      !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '744131293231822');
  fbq('track', 'PageView');
      `,
        }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=744131293231822&ev=PageView&noscript=1" />`,
        }}
      />
      <Script
        // strategy="afterInteractive"
        id="googleMaps"
        strategy="lazyOnload"
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
      />
      <Script
        id="meta-pixel"
        dangerouslySetInnerHTML={{
          __html: `
      !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '327731249272380');
  fbq('track', 'PageView');
      `,
        }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=327731249272380&ev=PageView&noscript=1" />`,
        }}
      />
      <Script
        src={`https://code.jquery.com/jquery-3.2.1.slim.min.js`}
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossOrigin="anonymous"
      />
      {/* End Meta Pixel Code */}
      <CommonFunctionContextProvider>
        <ToastContextProvider>
          <UserContextProvider>
            <AuthContextProvider>
              <ConfirmProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ConfirmProvider>
            </AuthContextProvider>
          </UserContextProvider>
        </ToastContextProvider>
      </CommonFunctionContextProvider>
      {/* <Script
        src={`https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js`}
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"
      />
      <Script
        src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"
      /> */}
    </Provider>
  );
}
export default MyApp;
