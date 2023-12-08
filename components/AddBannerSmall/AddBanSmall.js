import React from 'react'

export default function AddBanSmall({src,href,resolution}) {
  
  return (
    <>
     <a href={href} rel="nofollow" target="_blank" className="bannerAddsSmall">
        <figure>
        <img src={src} alt={src}/>
          {/* <img src="/images/02imgarticle.jpg" alt=""/> */}
        </figure>
      </a>
    
    </>
  )
}
