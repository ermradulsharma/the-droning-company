import React, { useEffect, useState } from "react";
import Loader from "@/components/Common/Loader";
import AddBanSmall from "../AddBannerSmall/AddBanSmall";

const AddBannerComponentSmall = ({ data, status, position, index }) => {
  const [mainData, setData] = useState([]);
  useEffect(() => {
    if (data && data !== undefined) {
      setData(data);
    }
  }, [data]);
  return (
    <>
      {status === "loading" || data === null ? (
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
              visible={status === "loading" || data === null}
            />
          </div>
        </div>
      ) : (
        <div
          className={
            mainData[position]?.banner[index]?.length > 0
              ? "container mt-2"
              : ""
          }
        >
          {mainData && (
            <AddBanSmall
              href={mainData[position]?.banner[index]?.link}
              src={mainData[position]?.banner[index]?.banner_image_full_path}
              resolution={mainData[position]?.banner[index]?.image_resolution}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AddBannerComponentSmall;
