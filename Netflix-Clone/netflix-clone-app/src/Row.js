import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';


const baseURL = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchURL, isLargeRow }) {

    const [movies, setMovies] = useState([]);

    const [trailerURL, setTrailerURL] = useState("");

    useEffect(() => {
        // if [] is blank then run this particular useEffect just once
        async function fetchData() {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            console.table(request);
            return request;
        }
        fetchData();
    }, [fetchURL]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = async (movie) => {
        if (trailerURL) {
          setTrailerURL("");
        } else {
          let trailerurl = await axios.get(
            `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
          );
          setTrailerURL(trailerurl.data.results[0]?.key);
        }
      };

    return (
        <div className="row">
            <h2 className="row__title">{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
            {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
        </div>
    )
}

export default Row;
