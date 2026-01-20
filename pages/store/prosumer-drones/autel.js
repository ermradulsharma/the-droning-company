import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import StaticBlock from "../../../components/Home/StaticBlock";
import { useRouter } from "next/router";
import useCommonFunctionContext from "../../../hooks/useCommonFunctionContext";
import { SERVER_URL, APPLICATION_NAME } from "../../../util/Constants";
import Loader from "@/components/Common/Loader";
import SEO from "../../../components/Seo/Seo";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageAdsData } from "../../../redux/HomePageSlice";
import { generateRandomBannerIndex, randomRangeIndex } from "../../../util/utils";
import AddBannerComponent from "../../../components/AddBannerComponent/AddBannerComponent";

const Store = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  let history = useRouter();
  const { currentUrlFn } = useCommonFunctionContext();
  const currentUrl = currentUrlFn();
  const { getHomePageAdsData_status, getHomePageAdsData_data, getHomePageAdsData_error } = useSelector((state) => state?.home);
  const [homeBannerTopIndex, setHomeBannerTopIndex] = useState(0);
  const [metaTitle, setMetaTitle] = useState("Prosumer Drones");
  const [metaKeyword, setMetaKeyword] = useState("Prosumer, Drones");
  const [metaDescription, setMetaDescription] = useState("THE WORLD #1 RESOURCE FOR DRONE COMMUNITY");
  useEffect(() => {
    dispatch(getHomePageAdsData());
  }, []);
  const [UNDER_BANNER, setUNDER_BANNER] = useState(0);
  useEffect(() => {
    if (getHomePageAdsData_data !== null) {
      let underbanner_index = getHomePageAdsData_data?.findIndex(
        (item) => item?.section_name_slug === "underneath-the-main-banner"
      );
      setUNDER_BANNER(underbanner_index);
      setHomeBannerTopIndex(
        generateRandomBannerIndex(
          "homeBannerTopIndex",
          getHomePageAdsData_data[underbanner_index]?.banner?.length || 0
        )
      );

    }
  }, [getHomePageAdsData_data]);

  return (
    <Fragment>
      <SEO
        title={metaTitle}
        description={metaDescription}
        siteTitle={`${APPLICATION_NAME}`}
        keywords={metaKeyword}
        href={currentUrl}
      />

      <div className="drone_stores">
        <div className="container">

          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item" aria-current="page"><a href="/store">Store</a></li>
            <li className="breadcrumb-item active" aria-current="page">Prosumer Drones</li>
          </ol>
          <hr className="mt-0"></hr>

          {/* Banner End */}
          <AddBannerComponent
            data={getHomePageAdsData_data}
            status={getHomePageAdsData_status}
            position={UNDER_BANNER}
            index={homeBannerTopIndex}
          />

          <div className="row">
            <div className="col-md-4">
              <StaticBlock
                description={'Autel Robotics EVO II 2 Pro Drone 6K HDR Video for Professionals Rugged'}
                image={'/images/stores/autel-drone-01.jpg'}
                url={'https://www.autel-store.com/autel-robotics-evo-ii-pro-drone-6k.html?tracking=xyjqm275AmXQyE7RrDjCjU4zwdTzTWXipfBtYs7PzAqWTaZ53PxpIvYHTrxdpgy0'}
                target={'_blank'}
              />
            </div>
            <div className="col-md-4">
            </div>
            <div className="col-md-4">
            </div>
          </div>

        </div>
      </div>

    </Fragment>
  );
};

export default Store;
