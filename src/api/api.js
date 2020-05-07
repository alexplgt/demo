import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "555f1dc9-2d34-4e28-a34a-1b143ab048bf"},
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
});

export const userApi = {
    getUsers(currentPage, pageSize) {
       return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return (response.data)
        })
    },
    unfollow(userId){
        return instance.delete(`/follow/${userId}`).then(response => {
            return (response.data)
        })
    },
    follow(userId){
        return instance.post(`/follow/${userId}`).then(response => {
            return (response.data)
        })
    },
    auth(){
        return instance.get(`/auth/me`)
    },
    getUserProfile(userId){
        return instance.get(`profile/${userId}`).then(response => {
            return (response.data)
        })
    },
    getUserStatus(userId){
        return instance.get(`profile/status/${userId}`)

    },
    setUserStatus(status){
        return instance.put(`profile/status/`, {status})

    },
    login(email, password, rememberMe){
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout(){
        return instance.delete(`auth/login`)
    },
    uploadPhoto(photo){
        const formData = new FormData();
        formData.append('image', photo, );
        return instance.post('...url...', formData, {})
    }
}