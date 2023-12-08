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


const DroneGeekModal = ({ open, handleClose, vedioData }) => {
    return (
      <Dialog maxWidth={"md"} open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            background: "black",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h2 className="ArticleTitle">The drone geek</h2>
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
            {vedioData?.map((item, i) => (
              <iframe
                height={350}
                key={i}
                width={"50%"}
                style={{
                  border: 0,
                }}
                src={extractVedioId(item?.page_video_link)}
                className="p-2"
               
              />
            ))}
          </Box>
        </DialogContent>
       
      </Dialog>
    );
  };

export default DroneGeekModal