import axios from "axios";

function likepost(body){
    console.log(body)
    const promisse = axios.post(`${process.env.REACT_APP_API_URI}/like`, body)
    return promisse
}

// a funcao que esta com erro: 

function deslike(body) {
    console.log(body);
    const { userliked, postId } = body; 
    const promisse = axios.delete(`${process.env.REACT_APP_API_URI}/deslike/${userliked}/${postId}`);
    return promisse;
  }

const postservices = {likepost, deslike}
export default postservices