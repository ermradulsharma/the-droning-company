import React, {Fragment, useState, useEffect} from "react";
import { useRouter } from "next/router";
import Loader from "react-loader-spinner";
import parse from 'html-react-parser';
import SEO from "../../components/Seo/Seo";
import { SERVER_URL, APPLICATION_NAME    } from "../../util/Constants";
import Error from 'next/error'
const CmsPage = (props) => {
   
    const router = useRouter();
    const pageName = router.query.cms;
    const currentUrl = props.currentUrl;
    const [loading, setLoading] = useState(true);
    const [pageDetail, setPageDetail] = useState(props.pageDetail);
    const [metaTitle, setMetaTitle] = useState(props.metaTitle);
    const [metaKeyword, setMetaKeyword] = useState(props.metaKeyword);
    const [metaDescription, setMetaDescription] = useState(props.metaDescription);

    useEffect(() => {      
        setLoading(true);
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
        getPageDetail();
      }, [pageName]);

    const getPageDetail = async() => {
        try {
          await	fetch(`${SERVER_URL}/cms/${pageName}`, {
              method: "GET",
          })
          .then((res) => res.json())
          .then((response) => {
            setLoading(false);
              if (response.statusCode === 200) {
                  setPageDetail(response.data[0]);
                  setMetaTitle(response.data[0].hasOwnProperty('meta_title') ? response.data[0].meta_title : '');
                  setMetaKeyword(response.data[0].hasOwnProperty('meta_keywords') ? response.data[0].meta_keywords : '');
                  setMetaDescription(response.data[0].hasOwnProperty('meta_description') ? response.data[0].meta_description : '');
              }
          });
        } catch (error) {
            setLoading(false);
        }
    }

    if (props.errorCode) {
        return <Error statusCode={'404'} />
    }
    return (
        
        loading
        ?
        <div className="row">
            <div className="col-md-12" style={{ textAlign: 'center' }}>
            <Loader
                type="ThreeDots"
                color="#ffcc0e"
                height={100}
                width={100}
                visible={loading}
            />
            </div>
        </div>
        :
        <Fragment>
            <SEO 
                  title={`${APPLICATION_NAME}`}
                  description={metaDescription ? metaDescription : pageDetail.page_text.substring(0, 160)}
                  siteTitle={metaTitle ? metaTitle : pageDetail.title}
                  keywords={metaKeyword}
                  href={currentUrl}
              />           
            <div className="Banner d-none d-sm-block">    
                <div className="BannerInner BackgroundPrivacy">
                
                    <div className="container"> 
                    <div className="row"> 
                        <div className="offset-sm-2 col-sm-8"> 
                        <div className="BannerText">
                            <div className="BannerTitle">{pageDetail.title}</div>
                            <p>{pageDetail.excerpt}</p>                
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="PrivacyPage paddngtb"> 
                <div className="container">
                    <div className="row"> 
                        <div className="col-sm-12"> 
                            <div className="justify-content-center">
                                <div className="MainHeading text-left">
                                {parse(`${pageDetail.page_text}`)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export async function getServerSideProps(context) {
    const currentURL = context.req.headers.host+''+context.resolvedUrl;
    const pageName = context.params.cms;
    return await fetch(`${SERVER_URL}/cms/${pageName}`, {
      method: "GET",
    })
    .then((res) => res.json())
    .then((response) => {
      if (response.statusCode === 200) {
        return {
          props: {
              pageDetail: response.data[0],
              metaTitle: response.data[0].hasOwnProperty('meta_title') ? response.data[0].meta_title : '',
              metaKeyword: response.data[0].hasOwnProperty('meta_keywords') ? response.data[0].meta_keywords : '',
              MetaDescription: response.data[0].hasOwnProperty('meta_description') ? response.data[0].meta_description : '',
              currentUrl: currentURL,
              errorCode: false
          },
         
        }
      } else {
        return {
          props: {
            pageDetail: {
              title: '',
              email: '',
              image: '',
              page_text: '',
              excerpt: ''
            },
            metaTitle: '',
            metaKeyword: '',
            MetaDescription: '',
            currentUrl: currentURL,
            errorCode: true
          }
        }
      }
    });
  }
export default CmsPage;