import React, { useState, useEffect } from "react";
import Link from "next/link";
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
import { extractVedioId } from "../../util/utils";

// const data = [
//   "http://14.97.182.98/images/box/ikK3G5gh6oU2c3DIE0e5Elfk7SSCafhf0fEaNZUm.png",
//   "http://14.97.182.98/images/box/ikK3G5gh6oU2c3DIE0e5Elfk7SSCafhf0fEaNZUm.png",
//   "http://14.97.182.98/images/box/ikK3G5gh6oU2c3DIE0e5Elfk7SSCafhf0fEaNZUm.png",
//   "http://14.97.182.98/images/box/ikK3G5gh6oU2c3DIE0e5Elfk7SSCafhf0fEaNZUm.png",
// ];

const VideoReviewModal = ({ open, handleClose, vedioData }) => {
  return (
    <Dialog maxWidth={"md"} fullWidth open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          background: "black",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2 className="ArticleTitle">Video Reviews</h2>
        <IconButton onClick={handleClose}>
          <CancelIcon
            sx={{
              color: "yellow",
            }}
          />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box className="row">
          {vedioData?.map((item, i) => (
            <>
              <iframe
                height={350}
                key={i}
                width={"100%"}
                className="col-12 col-md-6 p-2"
                style={{
                  border: 0,
                }}
                src={extractVedioId(item?.page_video_link)}
              />
            </>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VideoReviewModal;
