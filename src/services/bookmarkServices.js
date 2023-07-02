import axios from "axios";
import { getEncodedToken } from "../utils/encodedToken";
const getAllBookmarkService = () => {
    const encodedToken = getEncodedToken();

    return fetch(`/api/users/bookmark/`, {
        headers: {
            authorization: encodedToken
        },
    })
}

const addBookmarkService = (postId) => {
    const encodedToken = getEncodedToken();

    const config = {
        headers: {
            authorization: encodedToken
        }
    }
    return axios.post(`/api/users/bookmark/${postId}`, {}, config)
}

const removeBookMarkService = (postId) => {
    const encodedToken = getEncodedToken();

    const config = {
        headers: {
            authorization: encodedToken
        }
    }
    return axios.post(`/api/users/remove-bookmark/${postId}`, {}, config)
}
export { getAllBookmarkService, addBookmarkService, removeBookMarkService }