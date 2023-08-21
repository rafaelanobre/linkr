import axios from "axios"



async function searchquery(query){
    console.log(query)
    console.log('query')
    const promise = await axios.get(`${process.env.REACT_APP_API_URI}/users/${query}`)
    return promise.data
}

export default searchquery