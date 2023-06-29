import axios from "axios";
import { getEncodedToken } from "./postServices"

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
    // return fetch(`/api/users/bookmark/${postId}`, {}, {
    //     method: 'POST',
    //     headers: {
    //         authorization: encodedToken
    //     },
    //     body: {}
    // })
    return axios.post(`/api/users/bookmark/${postId}`, {}, config)
}

export { getAllBookmarkService, addBookmarkService }