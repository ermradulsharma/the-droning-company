import React, { useState } from "react";
import Image from "next/image";
export default function AddBan({ src, href, resolution }) {
  const resolutionArray = resolution?.split(" x ");
  const [loadingImage, setLoadingImage] = useState(true);
  return (
    <>
      <a
        href={href}
        rel="nofollow"
        target="_blank"
        className={
          resolution === "120 x 600" || resolution === "160 x 600"
            ? "bannerAdds bannerAdds_long"
            : "bannerAdds "
        }
      >
        <figure>
          <img src={src} alt={src} />

          {/* {(resolutionArray) ?
            <Image
              src={src} alt={src}
              onLoad={() => setLoadingImage(false)}
              width={resolutionArray[0]}
              height={resolutionArray[1]}
              priority={true}
            /> :
            <Image
              src={src} alt={src}
              onLoad={() => setLoadingImage(false)}
              priority={true}
            />} */}

          {/* <img src="/images/02imgarticle.jpg" alt=""/> */}
        </figure>
        {console.log(resolution)}
      </a>
    </>
  );
}
