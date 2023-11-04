import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleVideoComponent from "./SingleVideoComponent";
import youtube_api from "../API/youtube";
import Navigation from "../Router/Navigation";


function Videos() {
    const [videos, setVideos] = useState([]);

    const API_KEY = youtube_api();
    const CHANNEL_ID = "UCVnuhNpZ6W3gSq8PhgsFz-g";
    useEffect(() => {
        axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50`)
            .then((response) => {
                setVideos(response.data.items);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [API_KEY, CHANNEL_ID]);

    return (
        <>
            <Navigation/>
                {videos.map((video) => {
                    return (

                        <div className="w3-col l4">
                            <SingleVideoComponent date={video.snippet.publishedAt.split("T")[0]} link={video.id.videoId} image={video.snippet.thumbnails.high.url} title={video.snippet.title}  fullDescription={video.snippet.description} />
                        </div>

                )})}
        </>
    );
}

export default Videos;
