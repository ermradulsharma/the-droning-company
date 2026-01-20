import React, { useState, useEffect } from "react";
import { MEDIA_BASE_URL, SERVER_URL } from "../../util/Constants";
import { getCleanImageUrl } from "../../util/utils";
import Link from "next/link";
import Loader from "@/components/Common/Loader";
import parse from "html-react-parser";
import Image from 'next/image';

const SettingBlock = ({ ids, limit }) => {
  const [news, setNews] = useState([]);
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [limitNumber, setLimitNumber] = useState(5);
  const [limitLabel, setLimitLabel] = useState("Show more");

  useEffect(() => {
    try {
      fetch(`${SERVER_URL}/setting?ids=${ids}&limit=${limit}`, {
        method: "GET"
      })
        .then((res) => res.json())
        .then((response) => {
          // console.log(response);
          setLoadingNews(false);
          if (response.statusCode === 200) {
            setNews(response.data);
          }
        });
    } catch (error) {
      setLoadingNews(false);
    }
  }, [ids, limit]);

  return (
    <>
      {loadingNews ? (
        <div
          className="col-sm-12 text-center justify-content-between"
          style={{ textAlign: "center" }}
        >
          <Loader
            type="ThreeDots"
            color="#ffcc0e"
            height={100}
            width={100}
            visible={loadingNews}
          />
        </div>
      ) : (
        news &&
        news.map((block, index) => {
          return (

            <div key={index} className="col-item settingBlock" style={{ backgroundImage: "url(" + `${MEDIA_BASE_URL}/${getCleanImageUrl(block.block_image)}` + ")" }}>


              <div className="BandBox">
                <div className="BandBoxhead">
                  <h2>{block.block_title}</h2>
                  {block.block_subTitle1 ? (
                    <h3>{block.block_subTitle1}</h3>
                  ) : null}
                </div>
                <div className={`HomeBlockImg`}>
                  {/* <img
                    className="img-fluid"
                    src={block.block_image}
                    alt={block.block_title}
                  /> */}

                  {block.block_image ? (
                    <Image
                      src={`${MEDIA_BASE_URL}/${getCleanImageUrl(block.block_image)}`}
                      alt={block.block_title}
                      className="img-fluid"
                      onLoad={() => setLoadingImage(false)}
                      width={120}
                      height={120}
                      priority={true}
                    />
                  ) : null}
                </div>
                <p>{block.block_description}</p>

                <Link href={block?.block_button_link} passHref legacyBehavior>
                  <a className="btn BtnLearn">LEARN MORE</a>
                </Link>
              </div>






            </div>

          );
        })
      )}
    </>

  );
};

export default SettingBlock;
