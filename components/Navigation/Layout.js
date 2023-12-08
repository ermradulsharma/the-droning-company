import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import SideNavMenuDrawer from '../../components/Navigation/SideNavMenuDrawer/SideNavMenuDrawer';
import TopMenuBar from '../../components/Navigation/Menubar/TopMenuBar';
import useAuthContext from "../../hooks/useAuthContext";
import CookieConsent from "react-cookie-consent";
import useUserContext from "../../hooks/useUserContext";
import { useRouter } from 'next/router';


import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = (props) => {
  let location = useRouter();
  const { authTokens, accessToken } = useAuthContext();
  const { drawerCollapsed, setDrawerCollapsed } = useUserContext();
  const drawerCollapsedHandler = (isCollapsed) => {
    if (isCollapsed) {
      document.body.className = "sidebar-toggled";
    } else {
      document.body.className = "";
    }
    setDrawerCollapsed(isCollapsed);
  }
  const cookieConsentLayer = (
    <CookieConsent
      sameSite="Strict"
      buttonText="Accept"
      style={{
        background: "#000000",
        paddingLeft: "10%",
        paddingRight: "10%",
      }}
      buttonStyle={{
        background: "#fecd0e",
        borderRadius: "2px",
        padding: "5px",
        color: "#000000",
        fontWeight: "bolder",
      }}
    >
      <h4>Cookies on The Droning Company</h4>{" "}
      <p style={{ color: "#fecd0e" }}>
        We use cookies to personalize content and ads, to provide social media
        features and to analyze our traffic. We also share information about
        your use of our site with our social media, advertising and analytics
        partners.
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#fecd0e", paddingLeft: "10px" }}
        >
          About our Cookies
        </a>
      </p>
    </CookieConsent>
  )
  return authTokens && accessToken && (location.pathname.includes('user') || location.pathname.includes('pilot-area')) ?
    (
      <Aux>
        <div id="wrapper">
          <SideNavMenuDrawer />
          {/* <!-- End of Sidebar --> */}
          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">

            {/*  Main Content  */}
            <div id="content">
              {/* Topbar */}
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* Sidebar Toggle (Topbar) */}
                <button id="sidebarToggleTop" type="button" className="btn btn-link d-md-none rounded-circle mr-3" onClick={() => drawerCollapsedHandler(!drawerCollapsed)}>
                  <i className="fa fa-bars"></i>
                </button>
                {/*  Topbar Navbar */}
                <TopMenuBar />
              </nav>
              {/*  End of Topbar  */}

              {/* Begin Page Content */}
              <Aux>
                {props.children}
              </Aux>
              {/* End of Page Content */}
            </div>
            {/* End of Main Content */}

            {/*  <!-- Footer --> */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your <a href="">thedroningcompany.com</a> 2021</span>
                </div>
              </div>
            </footer>
            {/* <!-- End of Footer --> */}

          </div>
        </div>
      </Aux>

    )
    :
    (
      <Aux>
        <Header />
        {props.children}
        <Footer />
        {/* {cookieConsentLayer} */}
      </Aux>
    )
}
export default Layout;
