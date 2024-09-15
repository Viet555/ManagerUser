
import axios from "./Axio";
const fetchaAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}
const postNewUsers = (name, job) => {
    return axios.post('/api/users', { name, job })
}
const putUpdateUsers = (name, job) => {
    return axios.put('/api/users/', { name, job })
}
const DeleteUsers = (id) => {
    return axios.delete(`/api/users/${id}`)
}
const PostLogin = (email, password) => {
    return axios.post('api/login', { email, password })
}
export { fetchaAllUser, postNewUsers, putUpdateUsers, DeleteUsers, PostLogin };
