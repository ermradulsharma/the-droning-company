import React from "react";
import Image from "next/image";
export default function AddBan({ src, href }) {
  return (
    <>
      <a href={href} rel="nofollow noreferrer" target="_blank" className="bannerAdds">
        <figure>
          <Image src={src || '/images/no-image.png'} alt={(src) || 'image'} width={1140} height={200} />
          {/* <img src="/images/02imgarticle.jpg" alt=""/> */}
        </figure>
      </a>
    </>
  );
}
