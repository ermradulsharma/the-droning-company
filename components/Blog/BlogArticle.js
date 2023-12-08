import React from "react";
import AUX from "../../hoc/Auxiliary/Auxiliary";
import Link from "next/link";
const BlogArticle = (props) => {

    const getBlogCategories = () => {
        return props.categories.map((category, index) => {
            return  <Link key={category.slug} href={`/news/categories/${category.slug}`} className="TdArticleCategory updates">{category.title}</Link>
        })      
    }

    return (
        <AUX>
            {
                props.position ===  0
                ?
                <article key={props.key} className="TdArticleListItem TdPostListColumns">
                <div className="TdArticleContentHolder row">
                    {
                        props.blogImage
                        ?
                        <div className="TdArticleMedia col-lg-7"> 
                            <div className="TdMediaBox">                            
                                <img className="img-fluid" src={props.blogImage} alt="post1" />
                            </div>  
                        </div>
                        :
                        null
                    }
                    
                    <div className={`TdArticleTextContent ${props.blogImage ? "col-lg-5" : "col-lg-12"}`}>
                        <div className="TdArticleHeadline">
                            <header className="Td_headline">
                                <h2 className="Td_headline_tag">
                                    <span className="Td_headline_superheadline">
                                        <span className="TdArticleCategories">{getBlogCategories()}</span>
                                    </span>
                                    <span className="Td_headline_content">
                                    <Link href={`/blog/${props.slug}`} title={props.title} >{props.title}</Link>
                                    </span>
                                </h2>
                                {/* <div className="Td_headline_subheadline">
                                    <span className="TdArticleAuthor"><a href="#" className="TdArticleAuthorURL">by Bold</a></span>
                                </div> */}
                                <hr />
                                <p>{props.excerpt != '' ? props.excerpt : props.description != '' ? props.description.substr(0, 50) : ''}</p>
                                <Link href={`/blog/${props.slug}`}>
                                    <a href={`/blog/${props.slug}`} className="SeeMore">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                                </Link>
                            </header>                        
                        </div>                  
                    </div>
                    </div>
                </article>
                :

                <article key={props.key} className="TdArticleListItem TdPostListColumns">
                    <div className="TdArticleContentHolder row">
                        <div className={`TdArticleTextContent ${props.blogImage ? "col-lg-5" : "col-lg-12"}`}>
                            <div className="TdArticleHeadline">
                                <header className="Td_headline">
                                    <h2 className="Td_headline_tag">
                                        <span className="Td_headline_superheadline">
                                        <span className="TdArticleCategories">{getBlogCategories()}</span>
                                        </span>
                                        <span className="Td_headline_content"><Link href={`/blog/${props.slug}`} title={props.title} >{props.title}</Link></span>
                                    </h2>
                                    {/* <div className="Td_headline_subheadline">
                                        <span className="TdArticleAuthor"><a href="#" className="TdArticleAuthorURL">by Bold</a></span>
                                    </div> */}
                                    <hr />
                                    <p>{props.excerpt}</p>
                                    <Link href={`/blog/${props.slug}`}>
                                        <a href={`/blog/${props.slug}`} className="SeeMore">Read More <i className="fas fa-long-arrow-alt-right"></i></a>
                                    </Link>
                                </header>
                            </div>
                        </div>
                        {
                            props.blogImage
                            ?
                            <div className="TdArticleMedia col-lg-7"> 
                                <div className="TdMediaBox">
                                    <img className="img-fluid" src={props.blogImage} alt="post2" />
                                </div>
                            </div>
                            :
                            null
                        }                        
                    </div>
                </article>
            }
        </AUX>
        
    )
}

export default BlogArticle;