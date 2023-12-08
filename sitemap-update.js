const fs = require('fs'),
    convert = require('xml-js'),
    moment = require('moment'),
    hostBlogBaseURL = 'https://www.thedroningcompany.com/blog',
    getBlogsListURL = `https://media.thedroningcompany.com/api/v1/blog/sitemap`, //@todo get all blogs
    hostBlogCategoryBaseURL = 'https://www.thedroningcompany.com/news/categories',
    getBlogCategoryListURL = `https://media.thedroningcompany.com/api/v1/blog-categories`, //@todo get all blog categories
    hostPilotBaseURL = 'https://www.thedroningcompany.com/pilot',
    getPilotListURL = `https://media.thedroningcompany.com/api/v1/pilot/sitemap`, //@todo get all pilots
    hostJobDetailBaseURL = 'https://www.thedroningcompany.com/job',
    getJobListURL = 'https://media.thedroningcompany.com/api/v1/job/list/sitemap',
    untrackedUrlsList = [],
    options = { compact: true, ignoreComment: true, spaces: 4 };
/*
    Method to Fetch dynamic List of URLs from Rest API/DB
*/
const axios = require('axios');

const fetchBlogsList = async () => {
    await axios(`${getBlogsListURL}`, {
        method: "GET",
    })
        .then((response) => {
            let blogPosts = response.data.data.data;
            blogPosts.forEach(element => {
                let urlData = { url: '', lastMod: '' };
                const modifiedURL = element.slug;
                urlData.url = `${hostBlogBaseURL}/${modifiedURL}`;
                urlData.lastMod = element.lastModified;
                untrackedUrlsList.push(urlData);
            });
            filterUniqueURLs();
        })
        .catch(error => {
            console.log(error);
        });
}

const fetchBlogsCategoryList = async () => {
    await axios(`${getBlogCategoryListURL}`, {
        method: "GET",
    })
        .then((response) => {
            let blogCategoryPosts = response.data;
            if (blogCategoryPosts.statusCode === 200 && blogCategoryPosts.data.length > 0) {

                blogCategoryPosts.data.forEach(element => {
                    let urlData = { url: '', lastMod: '' };
                    const modifiedURL = element.slug;
                    urlData.url = `${hostBlogCategoryBaseURL}/${modifiedURL}`;
                    urlData.lastMod = element.lastModified;
                    untrackedUrlsList.push(urlData);
                });
                filterUniqueURLs();
            }
        })
        .catch(error => {
            console.log(error);
        });
}

const fetchPilotList = async () => {
    await axios(`${getPilotListURL}`, {
        method: "GET",
    })
        .then((response) => {
            let pilotsList = response.data;
            if (pilotsList.statusCode === 200 && pilotsList.data.length > 0) {
                pilotsList.data.forEach(element => {
                    let urlData = { url: '', lastMod: '' };
                    const modifiedURL = element.slug;
                    urlData.url = `${hostPilotBaseURL}/${modifiedURL}`;
                    urlData.lastMod = element.lastModified;
                    untrackedUrlsList.push(urlData);
                });
                filterUniqueURLs();
            }
        })
        .catch(error => {
            console.log(error);
        });
}


const fetchJobList = async () => {
    await axios(`${getJobListURL}`, {
        method: "GET",
    })
        .then((response) => {
            let jobList = response.data;
            if (jobList.statusCode === 200 && jobList.data.length > 0) {
                jobList.data.forEach(element => {
                    let urlData = { url: '', lastMod: '' };
                    const modifiedURL = `${element.id}/${element.slug}`;
                    urlData.url = `${hostJobDetailBaseURL}/${modifiedURL}`;
                    urlData.lastMod = element.lastModified;
                    untrackedUrlsList.push(urlData);
                });
                filterUniqueURLs();
            }
        })
        .catch(error => {
            console.log(error);
        });
}
/*
    Method to Filter/Unique already existing URLs and new urls we fetched from DB
*/
const filterUniqueURLs = () => {
    fs.readFile('./sitemap.xml', (err, data) => {
        if (data) {
            const existingSitemapList = JSON.parse(convert.xml2json(data, options));
            let existingSitemapURLStringList = [];
            if (existingSitemapList.urlset && existingSitemapList.urlset.url && existingSitemapList.urlset.url.length) {
                existingSitemapURLStringList = existingSitemapList.urlset.url.map(ele => ele.loc._text);
            }

            untrackedUrlsList.forEach(data => {
                const ele = data.url;
                if (existingSitemapURLStringList.indexOf(ele.url) == -1) {
                    existingSitemapList.urlset.url.push({
                        loc: {
                            _text: ele,
                        },
                        changefreq: {
                            _text: 'monthly'
                        },
                        priority: {
                            _text: 0.8
                        },
                        lastmod: {
                            _text: moment(new Date(data.lastMod)).format('YYYY-MM-DD')
                        }
                    });
                }
            });
            createSitemapFile(existingSitemapList);
        }
    });
}

/*
    Method to convert JSON format data into XML format
*/
const createSitemapFile = (list) => {
    const finalXML = convert.json2xml(list, options); // to convert json text to xml text
    saveNewSitemap(finalXML);
}

/*
    Method to Update sitemap.xml file content
*/
const saveNewSitemap = (xmltext) => {
    fs.writeFile('./sitemap.xml', xmltext, (err) => {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

// fetchBlogsCategoryList();
// fetchBlogsList();
// fetchPilotList();
// fetchJobList();