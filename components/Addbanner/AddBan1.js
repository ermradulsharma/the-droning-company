import React from "react";
import Image from "next/image";
export default function AddBan({ src, href }) {
  return (
    <>
      <a href={href} rel="nofollow" target="_blank" className="bannerAdds">
        <figure>
          <img src={src} alt={src} />
          {/* <img src="/images/02imgarticle.jpg" alt=""/> */}
        </figure>
      </a>
    </>
  );
}
