// generate random number from 0 to max
export function random(max) {
  return Math.floor(Math.random() * max);
}
// generate random number from min to max
export function randomRangeIndex(length) {
  let x = Math.floor(Math.random() * length);

  return x;
}

//checking token exist or not
export function checkTokenExist() {
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
export const generateRandomBannerIndex = (key, length) => {
  if (typeof window !== "undefined") {
    let local = localStorage.getItem(key);
    if (local === null || local === undefined || local >= length) {
      localStorage.setItem(key, 0);
      return 0;
    } else {
      let x = parseInt(local);
      if (x + 1 >= length) {
        localStorage.setItem(key, 0);
        return 0;
      } else {
        localStorage.setItem(key, x + 1);
        return x + 1;
      }
    }
  }
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
  data,
  slug_name,
  position_state,
  index_state,
  local_storage_name
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

export const GetFavBoxData = (data, slug) => {
  if (data?.length > 0) {
    let item = data?.find((_item) => _item?.slug === slug);

    return item;
  }

  return null;
};

export const extractVedioId = (vedio_url) => {
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

export const trancateStr = (str, length) => {
  return str.substring(0, length) + "...";
};
