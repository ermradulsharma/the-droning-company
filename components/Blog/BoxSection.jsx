import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import Link from "next/link";
import Loader from "@/components/Common/Loader";
import parse from "html-react-parser";
import Image from "next/image";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import axiosInstance from "../../api/AxiosInstance";
import { extractVedioId, GetFavBoxData } from "../../util/utils";
import DroneGeekModal from "./DroneGeekModal";
import ArticleModal from "./ArticleModal";
import InterViewModal from "./InterViewModal";
import VideoReviewModal from "./VideoReviewModal";

const BoxSection = () => {
  const [news, setNews] = useState([]);
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  // const [limitNumber, setLimitNumber] = useState(5);
  // const [limitLabel, setLimitLabel] = useState("Show more");
  const [open, setOpen] = React.useState(false);
  const [open_article, setopen_article] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick_open_article = () => {
    setopen_article(true);
  };

  const handleClose_open_article = () => {
    setopen_article(false);
  };

  const [fourboxData, setFourBoxData] = useState(null);
  const [fourboxDataloading, setLoading_fourboxData] = useState(false);
  const [article_data, setArticleData] = useState(null);
  const [interviews_data, setinterviewsData] = useState(null);
  const [video_reviews_data, setvideo_reviewsData] = useState(null);
  const [drone_geek_data, setdrone_geekData] = useState(null);
  const [open_interview_modal, setinterviewmodal] = useState(false);
  const [open_video_modal, setvideomodal] = useState(false);

  const getFavelBoxData = useCallback(async () => {
    setLoading_fourboxData(true);
    let { data } = await axiosInstance.get("get-favel-boxes");
    setLoading_fourboxData(false);
    if (data?.status) {
      let api_respomse = data?.data;
      setArticleData(GetFavBoxData(api_respomse, "articles"));
      setinterviewsData(GetFavBoxData(api_respomse, "interviews"));
      setvideo_reviewsData(GetFavBoxData(api_respomse, "video-reviews"));
      setdrone_geekData(GetFavBoxData(api_respomse, "the-drone-geek"));
    } else {
    }
  }, []);

  useEffect(() => {
    try {
      fetch(`${SERVER_URL}/home/blog`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          setLoadingNews(false);
          if (response.statusCode === 200) {
            setNews(response.data);
          }
        });
    } catch (error) {
      setLoadingNews(false);
    }
    getFavelBoxData();
  }, [getFavelBoxData]);

  return (
    <div className="MainArticles paddngtb">
      {fourboxDataloading ? (
        <>
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
                visible={fourboxDataloading}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div
                className="ArticleBox"
                style={{
                  cursor: "pointer",
                }}
              >
                <div className="ArticleTitle">{article_data?.box_name}</div>
                <div className="d-sm-block" style={{ position: "relative" }}>
                  <div>
                    <Link href="/blog/Fravel-s-Footnote/article" passHref legacyBehavior>
                      <a>
                        {article_data?.image_full_path ? (
                          <Image
                            className="img-fluid"
                            src={article_data?.image_full_path}
                            onLoad={() => setLoadingImage(false)}
                            alt="Video Reel of the Week"
                            width={400}
                            height={300}
                          />
                        ) : null}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              <div
                className="ArticleBox"
                onClick={() => setinterviewmodal(true)}
                style={{ cursor: "pointer" }}
              >
                <div className="ArticleTitle">{interviews_data?.box_name}</div>
                <div className="d-sm-block" style={{ position: "relative" }}>
                  <div>
                    <a>
                      {interviews_data?.image_full_path ? (
                        <Image
                          className="img-fluid"
                          src={interviews_data?.image_full_path}
                          onLoad={() => setLoadingImage(false)}
                          alt="video reviews data"
                          width={400}
                          height={300}
                        />
                      ) : null}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6" style={{ cursor: "pointer" }}>
              <div
                onClick={() => setvideomodal(true)}
                className="ArticleBox ArticleBoxLatestJobs"
              >
                <div className="ArticleTitle">
                  {video_reviews_data?.box_name}
                </div>
                <div className="d-sm-block" style={{ position: "relative" }}>
                  <div>
                    <a>
                      {video_reviews_data?.image_full_path ? (
                        <Image
                          className="img-fluid"
                          src={video_reviews_data?.image_full_path}
                          alt="Trending News"
                          width={400}
                          height={300}
                          onLoad={() => setLoadingImage(false)}
                        />
                      ) : null}
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="ArticleBox ArticleBoxLatestJobs cursor"
                style={{
                  cursor: "pointer",
                }}
              >
                <div className="ArticleTitle">{drone_geek_data?.box_name}</div>
                <div className="d-sm-block" style={{ position: "relative" }}>
                  <div onClick={handleClickOpen}>
                    <a>
                      {drone_geek_data?.image_full_path ? (
                        <Image
                          className="img-fluid"
                          src={drone_geek_data?.image_full_path}
                          alt="Trending News"
                          onLoad={() => setLoadingImage(false)}
                          width={400}
                          height={300}
                        />
                      ) : null}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <DroneGeekModal
        open={open}
        handleClose={handleClose}
        vedioData={drone_geek_data?.favel_box_details}
      />
      <InterViewModal
        open={open_interview_modal}
        handleClose={() => setinterviewmodal(false)}
        vedioData={interviews_data?.favel_box_details}
      />

      <VideoReviewModal
        open={open_video_modal}
        handleClose={() => setvideomodal(false)}
        vedioData={video_reviews_data?.favel_box_details}
      />

      {/* <ArticleModal
        open={open_article}
        handleClose={handleClose_open_article}
        _data={article_data?.favel_box_details}
      /> */}
    </div>
  );
};

const Text = ({ title, link }) => {
  return (
    <div key={title} className="ArticleDesc mt-2">
      <div className="ArticleDescH fixHeight">{title}</div>

      <Link href={`/blog/${link}`} legacyBehavior>
        <a href={`/blog/${link}`} className="SeeMore">
          Read More <i className="fas fa-long-arrow-alt-right"></i>
        </a>
      </Link>
      <hr />
    </div>
  );
};

export default BoxSection;
