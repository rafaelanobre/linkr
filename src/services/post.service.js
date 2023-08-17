import axios from "axios";

function likepost(body){
    const promisse = axios.post(`${process.env.REACT_APP_API_URI}/like`, body)
    return promisse
}
function deslike(body){
    const promisse = axios.delete(`${process.env.REACT_APP_API_URI}/deslike`, body)
    return promisse
}

const postservices = {likepost, deslike}
export default postservices