import React, { useEffect, Fragment, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeUpdatePayment from "../../components/StripeCardForm/StripeUpdatePayment";
import useAuthContext from "../../hooks/useAuthContext";
import { STRIPE_KEY, APPLICATION_NAME } from "../../util/Constants";
import { useRouter } from "next/router";
import SEO from "../../components/Seo/Seo";

const stripePromise = loadStripe(STRIPE_KEY);

const UpdatePayment = () => {
	const { authTokens, accessToken, userId } = useAuthContext();
	let history = useRouter();

	const [metaDescription, setMetaDescription] = useState(
		"THE WORLD #1 RESOURCE FOR DRONE COMMUNITY"
	);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.scrollTo(0, 0);
		}
		if (!accessToken && !userId && !authTokens) {
			history.push('/login');
			return;
		}
	}, [])

	return (
		<Fragment>
			<SEO
				title={`${APPLICATION_NAME}`}
				description={metaDescription}
				siteTitle='Update Card Details'
			/>
			<div className="SignupForm paddngtb">
				<div className="container">
					<div className="row no-gutters row-item">
						<div className="offset-sm-2 col-sm-8 col-item">
							<div className="RegisterBG2 LogsBackground">
								<div className="SignForm">
									<form className="formFill PilotRegistrationForm">
										<div className="row mt-4">
											<div className="col-sm-12 form-group mb-0">
												<div className="card">
													<div className="card-body">
														<div className="EnterBankDetails mb-0">
															<h3>Enter New Card Details</h3>
															<hr></hr>
															<Elements stripe={stripePromise}>
																<StripeUpdatePayment
																	userId={userId}
																	accessToken={accessToken}
																/>
															</Elements>
														</div>
													</div>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default UpdatePayment;