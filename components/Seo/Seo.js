import React, {Fragment} from 'react';
import Head from 'next/head'

export default function SEO(props) {
  return (
    <Head>
      <title>{`${props.title} | ${props.siteTitle}`}</title>
      <link rel='calnonical' href={props.href} />
      <meta name="description" content={props.description} />
      <meta name='keywords' content={props.keywords} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:site_name" content={props.siteTitle} />
      <meta property="twitter:card" content="summary" />
      {/* <meta property="twitter:creator" content={config.social.twitter} /> */}
      <meta property="twitter:title" content={props.title} />
      <meta property="twitter:description" content={props.description} />

      {
        props.image
        ?
        <Fragment>
          <meta property="og:url" content={props.href} />
          <meta property="og:image" content={props.image} />
          <meta property="og:image:width" content="600" />
          <meta property="og:image:height" content="600" />
          <meta property="og:image:type" content="image/jpeg,image/gif,image/jpg,image/png" />
          <meta property="twitter:image" content={props.image} />
          <meta property="twitter:image:alt" content={props.title} />
        </Fragment>
        :
        null
      }
      
      
    </Head>
    
  )
}