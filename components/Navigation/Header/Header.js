import React, { useState, useEffect, Fragment } from "react";
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Link from "next/link";
import Image from "next/image";
import useAuthContext from '../../../hooks/useAuthContext';
import Script from 'next/script';
import { useRouter } from "next/router";
import { SERVER_URL } from "../../../util/Constants";
const Header = () => {
    const { authTokens, accessToken, userType } = useAuthContext();

    let history = useRouter();
    const slug = history.query.categorySlug;
    const [searchKeyword, setSearchKeyword] = useState(slug);
    const onSearchCompany = () => {
        history.push(`/company-directory/${searchKeyword}`);
    };

    const onSearchBlog = () => {
        history.push(`/news/${searchKeyword}`)
    }

    const handleSubmit = e => {
        e.preventDefault();
        history.push(`/news/${searchKeyword}`)
    };

    const [showMe, setShowMe] = useState(false);
    const toggleMenu = () => {
        if (showMe == true) {
            //document.getElementById("navbarCollapse").classList.add("show");
        } else {
            //document.getElementById("navbarCollapse").classList.remove("show");   
        }
        setShowMe(!showMe);
    }

    const menuClass = (showMe === true) ? 'collapse navbar-collapse justify-content-md-center show' : 'collapse navbar-collapse justify-content-md-center';

    const [blogCategories, setblogCategories] = useState([]);
    useEffect(() => {
        fetch(`${SERVER_URL}/blog-categories`, {
            method: "GET",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((response) => {
                if (response.statusCode === 200) {
                    var categories = response.data.sort(function (a, b) {
                        if (a.title < b.title) {
                            return -1;
                        }
                        if (a.title > b.title) {
                            return 1;
                        }
                        return 0;
                    });
                    setblogCategories(categories);
                }
            })
            .catch((error) => {
                console.error("Error fetching blog categories:", error);
            });
    }, []);

    return (
        <Aux>
            <Script
                id="sticky-header"
                dangerouslySetInnerHTML={{
                    __html: `
                    window.onscroll = function() {myFunction()};
                    var header = document.getElementById("myHeader");
                    var sticky = header.offsetTop;
                    
                    function myFunction() {
                      if (window.pageYOffset > sticky) {
                        header.classList.add("sticky");
                      } else {
                        header.classList.remove("sticky");
                      }
                    }
                    `
                }}
            />
            <div className="TopBar">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <ul className="topLoginLinks">
                                {
                                    authTokens && accessToken ?
                                        <Aux>
                                            <li className="nav-item BtnLogin active">
                                                <Link href={`${userType.id === 3 ? "/pilot-area/dashboard" : (userType.id === 4 ? "/company-area/dashboard" : "/user/dashboard")}`} legacyBehavior>
                                                    <a className="nav-link" href={`${userType.id === 3 ? "/pilot-area/dashboard" : (userType.id === 4 ? "/company-area/dashboard" : "/user/dashboard")}`}><i className="fas fa-tachometer-alt"></i> Dashboard</a>
                                                </Link>
                                            </li>
                                            <li className="nav-item  BtnSignup"><Link href="/logout" legacyBehavior><a className="nav-link"><i className="fas fa-sign-out-alt"></i> Logout</a></Link></li>
                                        </Aux>
                                        :
                                        <Aux>
                                            <li className="nav-item BtnLogin active"><Link href="/login" legacyBehavior><a className="nav-link"><i className="fas fa-sign-in-alt"></i> Login</a></Link></li>
                                            <li className="nav-item BtnSignup"><Link href="/registration" legacyBehavior><a className="nav-link"><i className="fas fa-user"></i> Sign Up</a></Link></li>
                                        </Aux>
                                }
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <form action="" method="get" _lpchecked="1" className="SearchBar HirePilotForm" onSubmit={handleSubmit}>
                                <div className="form-inline">
                                    <input
                                        type="text"
                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                        value={searchKeyword}
                                        className="form-control bg-light border-0 small"
                                        placeholder="Search For..."
                                        aria-label="Search"
                                        aria-describedby="basic-addon2"
                                        style={{ minWidth: '301px' }}
                                    />
                                    <button className="btn BtnSearch" type="button" onClick={() => onSearchBlog()}><i className="fas fa-search fa-sm"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <header id='myHeader'>
                <nav className="navbar navbar-expand-md">
                    <div className="container">
                        <Link href="/" legacyBehavior>
                            <a className="navbar-brand d-block d-md-none">
                                <Image
                                    className="img-fluid"
                                    src="/images/logo.webp"
                                    alt="logo"
                                    width={160}
                                    height={40}
                                    priority={true}
                                    style={{ width: 'auto' }}
                                />
                            </a>
                        </Link>
                        <Link href="/registration" legacyBehavior>
                            <a className="DCMyAccount"><i className="fas fa-user"></i></a>
                        </Link>
                        <button onClick={toggleMenu} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <i className={(showMe === true) ? 'fas fa-times' : 'fas fa-bars'}></i>
                            <span>Menus</span>
                        </button>

                        <div className={menuClass} id="navbarCollapse">
                            <ul className="navbar-nav">
                                {
                                    accessToken && authTokens
                                        ?

                                        <li className="nav-item dropdown" key={`main-nav-item-1`}>
                                            <Link href="/" legacyBehavior>
                                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Jobs</a>
                                            </Link>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                {
                                                    userType.id === 3
                                                        ?
                                                        null
                                                        :
                                                        <Aux>
                                                            <Link href="/user/create-job" legacyBehavior><a className="dropdown-item">Post a job </a></Link>
                                                            <div className="dropdown-divider"></div>
                                                        </Aux>
                                                }
                                                <Link href="/job-list" legacyBehavior><a className="dropdown-item">Find a Job</a></Link>
                                            </div>
                                        </li>
                                        /* :
                                        <li className="nav-item"><Link className="nav-link" passHref href="/user/create-job">Post a job listing</Link></li> */
                                        :
                                        <li className="nav-item dropdown" key={`main-nav-item-2`}>
                                            <Link href="/jobs" legacyBehavior>
                                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/jobs">Jobs</a>
                                            </Link>
                                            <div id="jobDD" className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <Link href="/login" legacyBehavior><a className="dropdown-item" >Post a job </a></Link>
                                                <div className="dropdown-divider"></div>
                                                <Link href="/job-list" legacyBehavior><a className="dropdown-item">Find a Job</a></Link>
                                            </div>
                                        </li>
                                }
                                <li className="nav-item" key={`main-nav-item-3`}><Link href="/company-directory" legacyBehavior><a className="nav-link">Company Directory</a></Link></li>
                                <li className="nav-item" key={`main-nav-item-4`}><Link href="/about-us" legacyBehavior><a className="nav-link">About</a></Link></li>
                                <li key={`main-nav-item-5`}>
                                    <Link href="/" legacyBehavior>
                                        <a className="navbar-brand">
                                            <Image
                                                className="img-fluid"
                                                src="/images/logo.webp"
                                                alt="logo"
                                                width={200}
                                                height={50}
                                                priority={true}
                                                style={{ width: 'auto' }}
                                            />
                                        </a>
                                    </Link>
                                </li>
                                {/* <li className="nav-item"><Link href="/gear-reviews"><a className="nav-link">Gear Reviews</a></Link></li> */}
                                <li className="nav-item" key={`main-nav-item-6`}><Link href="/news" legacyBehavior><a className="nav-link">News</a></Link></li>
                                <li className="nav-item dropdown" key={`main-nav-item-7`}><Link href="/contact-us" legacyBehavior><a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Contact Us</a></Link>
                                    <div id="contactDD" className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link href="/contact-us" legacyBehavior><a className="dropdown-item">Contact Us</a></Link>
                                        <div className="dropdown-divider"></div>
                                        <Link href="/faqs" legacyBehavior><a className="dropdown-item">FAQs</a></Link>
                                    </div>
                                </li>

                                <li className="nav-item dropdown" key={`main-nav-item-8`}><Link href="/contact-us" legacyBehavior><a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Go To</a></Link>
                                    <ul id="contactDD" className="dropdown-menu scrollable" aria-labelledby="navbarDropdown">
                                        {
                                            blogCategories.map((category, index) => {
                                                return <li key={`category-item-${index}`}>
                                                    <Link href={`/news/categories/${category.slug}`} title={category.title} legacyBehavior><a className="dropdown-item">{category.title}</a></Link>
                                                    <div className="dropdown-divider"></div>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </li>


                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </Aux>
    )
}

export default Header;