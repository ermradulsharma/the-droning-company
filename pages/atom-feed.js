import { Feed } from "feed";
import { SERVER_URL, SERVER_BASE_URL, APPLICATION_NAME } from "../util/Constants";

const generateRssFeed = async (data) => {
    const feed = new Feed({
        title: APPLICATION_NAME + " Atom Feed",
        description: "The Worlds # 1 Resource for the Drone Community",
        id: SERVER_BASE_URL,
        link: SERVER_BASE_URL,
        language: "en",
        generator: APPLICATION_NAME,
        image: SERVER_BASE_URL + "/images/logo.webp",
        favicon: SERVER_BASE_URL + "/images/logo.webp",
        author: {
            name: APPLICATION_NAME,
            email: "info@thedroningcompany",
            link: SERVER_BASE_URL + "/about-us",
        },
        feedLinks: {
            rss: SERVER_BASE_URL + "/feed",
            json: SERVER_BASE_URL + "/json-feed",
            atom: SERVER_BASE_URL + "/atom-feed"
        },
    });

    data.forEach((post) => {
        feed.addItem({
            title: post.title,
            id: SERVER_BASE_URL + '/blog/' + post.slug,
            link: SERVER_BASE_URL + '/blog/' + post.slug,
            description: post.excerpt,
            date: new Date(post.created_at),
            image: post.image
        });
    });

    return feed.atom1();
};

const Rss = () => { };

export async function getServerSideProps({ res }) {
    const resData = await fetch(`${SERVER_URL}/blog-Feed`, {
        method: "GET",
    });
    const posts = await resData.json();
    const rss = await generateRssFeed(posts.data);
    res.setHeader("Content-Type", "text/xml");
    res.write(rss);
    res.end();
    return { props: {} };
}

export default Rss;