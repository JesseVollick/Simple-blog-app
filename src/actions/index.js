import axios from 'axios';
//convention to avoid typos by extracting
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=MARIOANDPEACH!@#$';

// Export Each individual Action
export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';

export function fetchPosts(){
    //Build URL to get data from via axios
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
    return {
        type: FETCH_POSTS,
        //payload is the data from axios request that is returned. Now being sent to the reducers
        payload: request
    };
}

export function createPost(values, callback) {
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
        .then(() => callback());
    return{
        type: CREATE_POST,
        payload: request
    };
}


export function deletePost(id, callback) {
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
        .then(() => callback())
    return{
        type : DELETE_POST,
        payload: id
    };
}

