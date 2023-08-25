import axios from "axios"

async function follow(body){
    const promise = await axios.post(`${process.env.REACT_APP_API_URI}/follow`, body)
    return promise.data 
}

async function unfollow(params){
    const promise = await axios.delete(`${process.env.REACT_APP_API_URI}/unfollow/${params.followerId}/${params.followingId}`)
    return promise.data 
}

async function getfollowers(params){
    const promise = await axios.get(`${process.env.REACT_APP_API_URI}/usersfollower/${params.followerId}/${params.followingId}`)
    return promise 
}

const Followers = {follow, unfollow, getfollowers}
export default Followers