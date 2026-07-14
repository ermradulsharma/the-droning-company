import { MEDIA_BASE_URL } from "./Constants";

// generate random number from 0 to max
export function random(max: number) {
    return Math.floor(Math.random() * max);
}
// generate random number from min to max
export function randomRangeIndex(length: number) {
    let x = Math.floor(Math.random() * length);

    return x;
}

//checking token exist or not
export function checkTokenExist(): boolean | undefined {
    if (typeof window !== "undefined") {
        const token = window.localStorage.getItem("tokens");

        if (token !== undefined && token !== null) {
            return true;
        } else {
            return false;
        }
    }
}

//function for generate random banner index
export const generateRandomBannerIndex = (key: string, length: number) => {
    if (typeof window !== "undefined") {
        let local = localStorage.getItem(key);
        if (local === null || local === undefined || parseInt(local, 10) >= length || isNaN(parseInt(local, 10))) {
            localStorage.setItem(key, "0");
            return 0;
        } else {
            let x = parseInt(local, 10);
            if (x + 1 >= length) {
                localStorage.setItem(key, "0");
                return 0;
            } else {
                localStorage.setItem(key, (x + 1).toString());
                return x + 1;
            }
        }
    }
    return 0;
};

// FUNCTION FOR DISPLAYING 2 ADDS IN THE DASHBOARD SECTION ONLY
/**
 * It takes in the data, slug_name, position_state, index_state, and local_storage_name as parameters
 * and returns the index of the data that matches the slug_name
 * @param data - The data that you want to display the adds in.
 * @param slug_name - The slug name of the section you want to display the adds in.
 * @param position_state - This is the state that holds the position of the banner in the array.
 * @param index_state - This is the state that will be used to store the index of the banner that will
 * be displayed.
 * @param local_storage_name - This is the name of the local storage key.
 */
export const DisplayAddsInDashboardPages = (
    data: any[],
    slug_name: string,
    position_state: any,
    index_state: any,
    local_storage_name: string
) => {
    if (typeof window !== "undefined") {
        let _index = data?.findIndex(
            (item) => item?.section_name_slug === slug_name
        );

        position_state(_index);
        index_state(
            generateRandomBannerIndex(
                local_storage_name,
                data[_index]?.banner?.length
            )
        );
    }
};

export const GetFavBoxData = (data: any[], slug: string) => {
    if (data?.length > 0) {
        let item = data?.find((_item) => _item?.slug === slug);

        return item;
    }

    return null;
};

export const extractVedioId = (vedio_url: string) => {
    if (vedio_url?.length) {
        let get_id = vedio_url?.split("v=");

        if (get_id?.length > 1) {
            let get_id_includes_andSign = get_id[1]?.split("&");

            if (get_id_includes_andSign?.length > 0) {
                return `https://www.youtube.com/embed/${get_id_includes_andSign[0]}`;
            }

            return `https://www.youtube.com/embed/${get_id[1]}`;
        }
    }
    // src={}
    return "";
};

export const trancateStr = (str: string, length: number) => {
    return str.substring(0, length) + "...";
};

export const getCleanImageUrl = (url: any) => {
    if (!url) return "/images/no-image.png";
    if (typeof url !== 'string') return url;

    // If it's already a local path, return it as is (Next.js will handle /images/ accurately)
    if (url.startsWith('images/') || url.startsWith('/images/')) {
        return url.startsWith('/') ? url : `/${url}`;
    }

    if (url.startsWith('http')) {
        try {
            const urlObj = new URL(url);
            return urlObj.pathname.replace(/^\//, "");
        } catch (e) {
            return url.replace(/^https?:\/\/[^\/]+\//, "").replace(/^\//, "");
        }
    }
    return url.replace(/^\//, ""); // Remove leading slash if any
};

export const getImageSrc = (url: any) => {
    if (!url) return "/images/no-image.png";
    const cleanedPath = getCleanImageUrl(url);
    if (cleanedPath.startsWith('/')) {
        return cleanedPath;
    }
    return `${MEDIA_BASE_URL}/${cleanedPath}`;
};
