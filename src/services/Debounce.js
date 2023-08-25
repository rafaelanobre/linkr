import axios from "axios"



async function searchquery(query){
    const promise = await axios.get(`${process.env.REACT_APP_API_URI}/users/${query.search}/${query.id}`)
    console.log(promise.data)
    return promise.data
}

export default searchquery