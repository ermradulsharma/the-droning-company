import React from 'react'
import Image from 'next/image';
import { MEDIA_BASE_URL } from '../../util/Constants';
import { getCleanImageUrl, getImageSrc } from "../../util/utils";

export default function AddBanSmall({ src, href, resolution }) {

  return (
    <>
      <a href={href} rel="nofollow noreferrer" target="_blank" className="bannerAddsSmall">
        <figure>
          <Image src={getImageSrc(src)} alt={(src) || 'image'} width={300} height={100} />
          {/* <img src="/images/02imgarticle.jpg" alt=""/> */}
        </figure>
      </a>

    </>
  )
}
