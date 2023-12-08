import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import Loader from "react-loader-spinner";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Link from "next/link";
//import Carousel from "react-bootstrap/Carousel";
const PhotoGallery = () => {
    const [gallery, setGallery] = useState([]);
    const [loadingGallery, setLoadingGallery] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [photoArray, setPhotoArray] = useState([{
        id: '',
        image: '',
        image_link: '',
        image_text: ''
    }]);
    useEffect(() => {
        try{
            fetch(`${SERVER_URL}/photo-galleries-new`, {
                method: "GET",
            })
            .then((res) => res.json())
            .then((response) => {
                setLoadingGallery(false);
                if (response.statusCode === 200) {
                    setGallery(response.data);
                    let arr = [];
                    for (let i=0; i< response.data.length; i++) {
                        let arr2 = [];
                        arr2.push(...response.data[i]);
                        arr.push(...arr2);
                    }
                    setPhotoArray(arr);
                }
            });
        } catch (error) {
            setLoadingGallery(false);
            console.log(error);
        }
        
    }, []);
    return (<div className="PhotoPortfolio">
        <div className="container">
            <div className="NormalHeading">Photo Gallery</div>
        </div>

        <div id="demo" className="carousel slide" data-ride="carousel">
        { isOpen && (
            <Lightbox 
                imageCaption = {photoArray[photoIndex].image_text}
                imageTitle = {<a style={{color:'#fecd0e'}} href={photoArray[photoIndex].image_link} target="_blank" rel="noopener noreferrer" alt={photoArray[photoIndex].image_text}>Visit the link...</a>}/* {photoArray[photoIndex].image_text}  */             
                mainSrc={photoArray[photoIndex].image}
                nextSrc={photoArray[(photoIndex + 1) % photoArray.length].image}
                prevSrc={photoArray[(photoIndex + photoArray.length - 1) % photoArray.length].image}
                onCloseRequest={() => setIsOpen(false)}
                onMovePrevRequest={() => setPhotoIndex((photoIndex + photoArray.length - 1) % photoArray.length)
                }
                onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % photoArray.length)
                }
            />
            )}
            {/* <Carousel>
                {
                    gallery.map((galleryOuterWarp, index) => {
                        index = index * 3;
                        return <div key={'galleryOuterWarpIndex-' + index} className={'carousel-item ' + (index == 0 ? 'active' : '')}>
                            {
                                galleryOuterWarp.map((photo, i) => {
                                    let imagePhotoIndex = index + i;
                                    return <div onClick={() => { setIsOpen(true); setPhotoIndex(imagePhotoIndex)}} className="col-sm-4 col-md-4" key={'galleryInnerWarpIndex-' + i}>
                                        <img className="img-fluid" src={photo.image} alt="photo" />
                                    </div>
                                })
                            }

                        </div>


                    })
                }
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=First slide&bg=373940"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            
            </Carousel> */}
            {/* <!-- The slideshow --> */}
            <div className="container carousel-inner no-padding">
                {
                    loadingGallery
                    ?
                    <div className="col-sm-12 text-center justify-content-between" style={{ textAlign: 'center' }}>
                        <Loader
                            type="ThreeDots"
                            color="#ffcc0e"
                            height={100}
                            width={100}
                            visible={loadingGallery}
                        />
                    </div>
                    :
                    gallery.map((galleryOuterWarp, index) => {
                        index = index * 3;
                        return <div key={'galleryOuterWarpIndex-' + index} className={'carousel-item ' + (index == 0 ? 'active' : '')}>
                            {
                                galleryOuterWarp.map((photo, i) => {
                                    let imagePhotoIndex = index + i;
                                    return <div onClick={() => { setIsOpen(true); setPhotoIndex(imagePhotoIndex)}} className="col-sm-4 col-md-4" key={'galleryInnerWarpIndex-' + i}>
                                        <img className="img-fluid" src={photo.image} alt="photo" />
                                    </div>
                                })
                            }

                        </div>


                    })
                }
            </div>

            {/* <!-- Left and right controls --> */}
            <Link href="#demo">
                <a className="carousel-control-prev" href="#demo" data-slide="prev">
                    <img className="img-fluid" src={`/images/arrow-left.png`} alt="arrow" />
                </a>
            </Link>    
            <Link href="#demo">
                <a className="carousel-control-next" href="#demo" data-slide="next">
                    <img className="img-fluid" src={`/images/arrow-right.png`} alt="arrow" />
                </a>
            </Link>
        </div>
    </div>)

}

export default PhotoGallery;