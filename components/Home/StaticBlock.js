import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MEDIA_BASE_URL } from "../../util/Constants";
import { getCleanImageUrl, getImageSrc } from "../../util/utils";
const StaticBlock = ({ title = null, image, url, target, description = null }) => {
  return (
    <div className="card categoryArticle StaticBlock">
      {title ?
        <h4 className="card-header">
          <Link
            href={`${url}`}
            target={target}
            rel={target === "_blank" ? "noreferrer" : undefined}>
            {title}
          </Link>
        </h4>
        : ""}
      <Link
        href={`${url}`}
        target={target}
        rel={target === "_blank" ? "noreferrer" : undefined}>

        <Image className="img-fluid" src={getImageSrc(image ? image : '/images/no-image.png')} alt={(title) || 'image'} width={400} height={300} />

      </Link>
      {description ? <div className="card-body"><Link
        href={`${url}`}
        target={target}
        rel={target === "_blank" ? "noreferrer" : undefined}>{description}</Link></div> : ""}
    </div>
  );
};

export default StaticBlock;