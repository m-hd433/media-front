
import { BASE_URL } from "./baseurl";
import { commonrequest } from "./commonReq";


// Add video 

// define function for add video 

export const addvideo = async (body) => {

    return await commonrequest("POST", `${BASE_URL}/videos`, body)

}


// get video

// define function for get video from back end

export const getVideo = async () => {
    return await commonrequest("GET", `${BASE_URL}/videos`, "")
}


// delete video card

// define fn for delete  video


export const deleteVideo = async (id) => {
    return await commonrequest("DELETE", `${BASE_URL}/videos/${id}`, {})
}



// define fn for add category

export const addCategory = async (body) => {
    return await commonrequest("POST", `${BASE_URL}/categories`, body)

}


// to get category

export const getAllCategory = async () => {
    return await commonrequest("GET", `${BASE_URL}/categories`, "")
}


// to delete category

export const deleteCategory = async (id) => {
    return await commonrequest("DELETE", `${BASE_URL}/categories/${id}`, {})
}



// watchhistory section
// ---get history

export const getHistory = async () => {
    return await commonrequest("GET", `${BASE_URL}/Watchhistory`, "")
}

// --add hsitory
export const addHistory = async (body) => {
    return await commonrequest("POST", `${BASE_URL}/Watchhistory`, body)
}



// geet single video details

export const getVideos = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/videos/${id}`, "")
}

// to update drag details in category all videos

export const updatecategory = async (id,body) => {
    return await commonrequest("PUT", `${BASE_URL}/categories/${id}`, body)
}

