 import axios from "axios";

 const instance = axios.create({
    //  baseURL is the url to make requests to the "the movie database"
    baseURL: "https://api.themoviedb.org/3",
 });

 export default instance; 