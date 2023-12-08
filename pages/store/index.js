import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";

import ArticleByCategoryBlock from "../../components/Home/ArticleByCategoryBlock";
import StaticBlock from "../../components/Home/StaticBlock";

import { useRouter } from "next/router";
import useCommonFunctionContext from "../../hooks/useCommonFunctionContext";
import { SERVER_URL, APPLICATION_NAME } from "../../util/Constants";
import Loader from "react-loader-spinner";
import SEO from "../../components/Seo/Seo";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageAdsData } from "../../redux/HomePageSlice";
import { generateRandomBannerIndex, randomRangeIndex } from "../../util/utils";
import AddBannerComponent from "../../components/AddBannerComponent/AddBannerComponent";

const Store = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  let history = useRouter();
  const { currentUrlFn } = useCommonFunctionContext();
  const currentUrl = currentUrlFn();
  const { getHomePageAdsData_status, getHomePageAdsData_data, getHomePageAdsData_error } = useSelector((state) => state?.home ?? {});
  const [homeBannerTopIndex, setHomeBannerTopIndex] = useState(0);
  const [metaTitle, setMetaTitle] = useState("Droning Store");
  const [metaKeyword, setMetaKeyword] = useState("Droning Store");
  const [metaDescription, setMetaDescription] = useState("THE WORLD #1 RESOURCE FOR DRONE COMMUNITY");
  useEffect(() => {
    dispatch(getHomePageAdsData());
  }, []);
  const [UNDER_BANNER, setUNDER_BANNER] = useState(0);
  useEffect(() => {
    if (getHomePageAdsData_data) {
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

      {/* Banner End */}
      <AddBannerComponent
        data={getHomePageAdsData_data}
        status={getHomePageAdsData_status}
        position={UNDER_BANNER}
        index={homeBannerTopIndex}
      />

      <div className="drone_stores">
        <div className="container">

          <div className="row">
            <div className="col-md-4">
              <StaticBlock title={'Consumer Drones'} image={'/images/categories/Consumer-Drones.jpg'} url={'/store/consumer-drones'} target={'_self'} />
            </div>
            <div className="col-md-4">
              <StaticBlock title={'Prosumer Drones'} image={'/images/categories/Prosumer-Drones.jpg'} url={'/store/prosumer-drones'} target={'_self'} />
            </div>
            <div className="col-md-4">
              <StaticBlock title={'Enterprise Drones'} image={'/images/categories/Enterprise-Drones.jpg'} url={'/store/enterprise-drones'} target={'_self'} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <StaticBlock title={'FPV Drones'} image={'/images/categories/FPV-Drones-2.jpg'} url={'#'} target={'_self'} />
            </div>
            <div className="col-md-4">
              <StaticBlock title={'LIDAR'} image={'/images/categories/lidar.jpg'} url={'#'} target={'_self'} />
            </div>
            <div className="col-md-4">
              <StaticBlock title={'3D Mapping'} image={'/images/categories/3D-Mapping.jpg'} url={'#'} target={'_self'} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <StaticBlock title={'Thermal Imaging'} image={'/images/categories/Thermal.jpg'} url={'#'} target={'_self'} />
            </div>
            <div className="col-md-4">
              <StaticBlock title={'Tactical & Law Enforcement'} image={'/images/categories/Tactical-Drones.jpg'} url={'#'} target={'_self'} />
            </div>
            <div className="col-md-4">
              <StaticBlock title={'Drone Accessories'} image={'/images/categories/Drone-Accessories.jpg'} url={'/store/drone-accessories'} target={'_self'} />
            </div>
          </div>

        </div>
      </div>

    </Fragment>
  );
};

export default Store;
