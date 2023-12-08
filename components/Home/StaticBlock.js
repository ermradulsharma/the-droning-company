import React, { useState, useEffect } from "react";
import Link from "next/link";
const StaticBlock = ({ title = null, image, url, target, description = null }) => {
  return (
    <div className="card categoryArticle StaticBlock">
      {title ?
        <h4 className="card-header">
          <Link href={`${url}`}>
            <a href={`${url}`} target={target}>{title}</a>
          </Link>
        </h4>
        : ""}
      <Link href={`${url}`}>
        <a href={`${url}`} target={target}>
          <img className="img-fluid" src={image ? image : '/images/no-image.png'} alt={title} />
        </a>
      </Link>
      {description ? <div className="card-body"><Link href={`${url}`}><a href={`${url}`} target={target}>{description}</a></Link></div> : ""}
    </div>
  );
};

export default StaticBlock;