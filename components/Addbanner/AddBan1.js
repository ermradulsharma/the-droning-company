import React from "react";
import Image from "next/image";
export default function AddBan({ src, href }) {
  return (
    <>
      <a href={href} rel="nofollow noreferrer" target="_blank" className="bannerAdds">
        <figure>
          <Image src={src} alt={src} width={1140} height={200} />
          {/* <img src="/images/02imgarticle.jpg" alt=""/> */}
        </figure>
      </a>
    </>
  );
}
