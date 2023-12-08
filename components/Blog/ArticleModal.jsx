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


const ArticleModal = ({ open, handleClose, _data }) => {
    return (
      <Dialog maxWidth={"md"} open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            background: "black",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h2 className="ArticleTitle">Articles</h2>
          <IconButton onClick={handleClose}>
            <CancelIcon
              sx={{
                color: "yellow",
              }}
            />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "row",
              m: "auto",
              width: "fit-content",
              flexWrap: "wrap",
            }}
          >
            <div className="d-sm-block pt-2" style={{ position: "relative" }}>
              {_data?.map((item) => {
                return (
                  <div key={item?.title} className="ArticleDesc mt-2">
                    <div className="ArticleDescH fixHeight">{item.title}</div>
  
                    <Link href={`/${item?.page_video_link}`}>
                      <a href={`/${item?.page_video_link}`} className="SeeMore">
                        Read More <i className="fas fa-long-arrow-alt-right"></i>
                      </a>
                    </Link>
                    <hr />
                  </div>
                );
              })}
            </div>
          </Box>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions> */}
      </Dialog>
    );
  };

export default ArticleModal