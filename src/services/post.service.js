import axios from "axios";

//{"userliked": "1","postId": "1"}

function likepost(body){
    const promisse = axios.post(`${import.meta.env.REACT_APP_API_URI}/like`, body)
    return promisse
}
function deslike(body){
    const promisse = axios.delete(`${import.meta.env.REACT_APP_API_URI}/deslike`, body)
    return promisse
}

const postservices = {likepost, deslike}
export default postservices