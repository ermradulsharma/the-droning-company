import React,{ useState, useEffect } from "react";
import { SERVER_URL } from "../../util/Constants";
import Link from "next/link";

const BlogCategories = () => {
    const [blogCategories, setblogCategories] = useState([]);

    useEffect(()=>{
        fetch(`${SERVER_URL}/blog-categories`, {
            method: "GET",
        })
        .then((res) => res.json())
        .then((response) => {
            if (response.statusCode === 200) {
                setblogCategories(response.data);
            }
        });
    }, []);

    return (
        
        <ul id="blog-cat">
            {
                blogCategories.map((category, index) => {
                    return  <li key={`categories-${index}`} className="cat-item cat-item-16 paddingBottomBlogCat">
                                <Link href={`/news/categories/${category.slug}`} title={category.title}>
                                    {category.title}
                                </Link>
                                {/* ({category.post_count}) */}
                            </li>
                })
            }
        </ul>
    )
}

export default BlogCategories;