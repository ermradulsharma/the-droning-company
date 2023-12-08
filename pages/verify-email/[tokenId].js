import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../../util/Constants";
import useToastContext from "../../hooks/useToastContext";
import useAuthContext from "../../hooks/useAuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "react-loader-spinner";

const VerifyEmail = ({ match }) => {
  const router = useRouter();
  const token = router.query.tokenId;
  const { setAuthTokens, userType } = useAuthContext();
  const { showToastSuccess, showToastError } = useToastContext();
  const [loading, setLoading] = useState(false);
  const [alredyVErified, setalredyVErified] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    // token !== undefined && dispatch(Verify_Email(token));
    token !== undefined && verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    setLoading(true);
    setalredyVErified(false);
    setError(null);
    try {
      await fetch(`${SERVER_URL}/verify-email/${token}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode === 200) {
            setLoading(false);
            if (response.email_verified_at) {
              setalredyVErified(true);
              showToastError("Email has been already verified!");
              return;
            }
            showToastSuccess("Email verified successfully");
            const encodedString = Buffer.from(
              `${response.data.email}:`
            ).toString("base64");
            setAuthTokens({
              encodedString: encodedString,
              stringEncodedAccess: response.access_token,
              name: `${response.data.first_name} ${response.data.last_name}`,
              email: response.data.email,
              userType: response.data.roles[0],
              userId: response.data.id,
            });
          } else {
            setLoading(false);
            setError(response.message);
            setalredyVErified(false);
            showToastError(response.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true)
  }, [])
  return (
    <div className="SignupForm paddngtb">

      <div className="container">
        <div className="row no-gutters row-item">
          <div className="offset-sm-2 col-sm-8 col-item">
            <div className="ThankYouPageBg LogsBackground">
              <div className="SignForm ThankYouPage">
                {loading ? (
                  <div className="row">
                    <div
                      className="col-sm-12 text-center justify-content-between"
                      style={{ textAlign: "center" }}
                    >
                      <Loader
                        type="ThreeDots"
                        color="#ffcc0e"
                        height={100}
                        width={100}
                        visible={loading}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    {error === null ? (
                      <div className="form-card">
                        <div className="row justify-content-center verify">
                          <div className="col-3">
                            {" "}
                            <i className="fas fa-check"></i>{" "}
                          </div>
                        </div>
                        <h2 className="fs-title text-center">
                          {alredyVErified
                            ? "Email has been already verified!"
                            : "Your email address has been verified."}
                        </h2>

                        <center>
                          <Link href={`${userType.id === 3 ? "/pilot-area/dashboard" : (userType.id === 4 ? "/company-area/dashboard" : (userType.id === 5 ? "/event/submit-event" : "/user/dashboard"))}`}>
                            <a className="btn btnRegister" href={`${userType.id === 3 ? "/pilot-area/dashboard" : (userType.id === 4 ? "/company-area/dashboard" : (userType.id === 5 ? "/event/submit-event" : "/user/dashboard"))}`}>{(userType.id === 5 ? "Submit Event" : "Go To Dashboard")}</a>
                          </Link>
                        </center>
                      </div>
                    ) : (
                      <div className="form-card">
                        <div className="row justify-content-center verify">
                          {/* <div className="col-3">
                            {" "}
                            <i className="fas fa-check"></i>{" "}
                          </div> */}
                        </div>
                        <h2 className="fs-title text-danger text-center">
                          Something went wrong
                        </h2>

                        <center>
                          <Link
                            href="/login"
                          >
                            <a
                              className="btn btnRegister"

                            >
                              Log in
                            </a>
                          </Link>
                        </center>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
