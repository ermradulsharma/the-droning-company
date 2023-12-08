import React, { useEffect, useState } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import SEO from "../../components/Seo/Seo";
import { APPLICATION_NAME } from "../../util/Constants";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomBannerIndex } from "../../util/utils";
import { getContactUsData } from "../../redux/HomePageSlice";
import AddBannerComponent from "../../components/AddBannerComponent/AddBannerComponent";
const AwardVoting = (props) => {
	const dispatch = useDispatch();
	const {
		getContactUsData_status,
		getContactUsData_data,
		getContactUsData_error,
	} = useSelector((state) => state?.home ?? {});

	const [aboveMailUsPosition, setAboveMailUsPosition] = useState(0);
	const [aboveMailUsIndex, setAboveMailUsIndex] = useState(0);
	const [underMailUsPosition, setUnderMailUsPosition] = useState(0);
	const [underMailUsIndex, setUnderMailUsIndex] = useState(0);
	const [underBannerOnePosition, setUnderBannerOnePosition] = useState(0);
	const [underBannerOneIndex, setUnderBannerOneIndex] = useState(0);
	const [underBannerTwoPosition, setUnderBannerTwoPosition] = useState(0);
	const [underBannerTwoIndex, setUnderBannerTwoIndex] = useState(0);

	useEffect(() => {
		dispatch(getContactUsData());
	}, []);

	useEffect(() => {
		if (getContactUsData_data) {
			let underbanner1_index = getContactUsData_data?.findIndex(
				(item) => item?.section_name_slug === "under-banner-1"
			);
			let underbanner2_index = getContactUsData_data?.findIndex(
				(item) => item?.section_name_slug === "under-banner-2"
			);
			let abovemailus_index = getContactUsData_data?.findIndex(
				(item) => item?.section_name_slug === "above-mail-us"
			);
			let undermailus_index = getContactUsData_data?.findIndex(
				(item) => item?.section_name_slug === "under-mail-us"
			);


			setAboveMailUsPosition(abovemailus_index);
			setUnderBannerOnePosition(underbanner1_index);
			setUnderBannerTwoPosition(underbanner2_index);
			setUnderMailUsPosition(undermailus_index);

			setUnderBannerOneIndex(
				generateRandomBannerIndex(
					"contactPageUnderBannerOneIndex",
					getContactUsData_data[underbanner1_index]?.banner?.length || 0
				)
			);
			setUnderBannerTwoIndex(
				generateRandomBannerIndex(
					"contactPageUnderBannerTwoIndex",
					getContactUsData_data[underbanner2_index]?.banner?.length || 0
				)
			);
			setAboveMailUsIndex(
				generateRandomBannerIndex(
					"contactPageAboveMailUsIndex",
					getContactUsData_data[abovemailus_index]?.banner?.length || 0
				)
			);
			setUnderMailUsIndex(
				generateRandomBannerIndex(
					"contactPageUnderMailUsIndex",
					getContactUsData_data[undermailus_index]?.banner?.length || 0
				)
			);
		}

		window.addEventListener('message', event => {
			if (event.origin.startsWith('https://www.thedroningcompany.com') || event.origin.startsWith('https://media.thedroningcompany.com')) {
				let height = event.data;
				setHeight(height + "px");
			}
		});

	}, [getContactUsData_data]);


	const ref = React.useRef();
	const [height, setHeight] = React.useState("600px");
	const onLoad = () => {
		//setHeight(ref.current.contentWindow.document.body.scrollHeight + "px");
	};

	return (
		<Aux>
			<SEO
				title={`${APPLICATION_NAME}`}
				description={""}
				siteTitle="Contact Us"
				keywords={""}
				href={props.currentUrl}
			/>
			<div className="Banner d-none d-sm-block">
				<div className="BannerInner BannerInn BannerInn-contactus">
					<div className="container">
						<div className="row">
							<div className="offset-sm-2 col-sm-8">
								<div className="BannerText">
									<div className="BannerTitle">Award Voting 2023</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<AddBannerComponent
				data={getContactUsData_data}
				status={getContactUsData_status}
				position={underBannerOnePosition}
				index={underBannerOneIndex}
			/>
			<div className="ContactUs paddngtb">


				<iframe
					ref={ref}
					onLoad={onLoad}
					id="awardVotingForm"
					src="https://media.thedroningcompany.com/award-voting"
					width="100%"
					height={height}
					scrolling="no"
					frameBorder="0"
					style={{
						maxWidth: "100%",
						width: "100%",
						overflow: "auto",
					}}
				></iframe>

				{/* <iframe
					src="https://media.thedroningcompany.com/award-voting"
					title="Contact Form"
					width="100%"
					height="700"
				></iframe> */}
			</div>
		</Aux>
	);
};
export async function getServerSideProps(context) {
	const currentURL = context.req.headers.host + "" + context.resolvedUrl;
	return {
		props: {
			currentUrl: currentURL,
		},
	};
}
export default AwardVoting;
