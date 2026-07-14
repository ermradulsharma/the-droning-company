import React from 'react'
import Image from 'next/image';

export default function AddBanSmall({ src, href }) {
  return (
    <>
      <a href={href} rel="nofollow noreferrer" target="_blank" className="bannerAddsSmall">
        <figure>
          <Image src={src || '/images/no-image.png'} alt={(src) || 'image'} width={300} height={100} />
          {/* <img src="/images/02imgarticle.jpg" alt=""/> */}
        </figure>
      </a>
    </>
  )
}
