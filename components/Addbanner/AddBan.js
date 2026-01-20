import React, { useState } from "react";
import Image from "next/image";
import { MEDIA_BASE_URL } from "../../util/Constants";
import { getCleanImageUrl } from "../../util/utils";
export default function AddBan({ src, href, resolution }) {
  const resolutionArray = resolution?.split(" x ");
  const [loadingImage, setLoadingImage] = useState(true);
  return (
    <>
      <a
        href={href}
        rel="nofollow noreferrer"
        target="_blank"
        className={
          resolution === "120 x 600" || resolution === "160 x 600"
            ? "bannerAdds bannerAdds_long"
            : "bannerAdds "
        }
      >
        <figure>
          {resolutionArray && src ? (
            <Image
              src={`${MEDIA_BASE_URL}/${getCleanImageUrl(src)}`}
              alt={src}
              onLoad={() => setLoadingImage(false)}
              width={parseInt(resolutionArray[0])}
              height={parseInt(resolutionArray[1])}
              priority={true}
            />
          ) : src ? (
            <Image
              src={`${MEDIA_BASE_URL}/${getCleanImageUrl(src)}`}
              alt={src}
              onLoad={() => setLoadingImage(false)}
              width={1140}
              height={200}
              priority={true}
            />
          ) : null}
        </figure>
      </a>
    </>
  );
}
