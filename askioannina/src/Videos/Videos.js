import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleVideoComponent from "./SingleVideoComponent";
import youtube_api from "../API/youtube";


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
                {videos.map((video) => {
                    return (
                        <>
                        <li key={video.id.videoId}>
                            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                            <p>{video.snippet.title}</p>
                        </li>
                        <SingleVideoComponent videoId = {video.id.videoId} date={video.snippet.publishedAt.split("T")[0]} link={video.id.videoId} image={video.snippet.thumbnails.high.url} title={video.snippet.title}  fullDescription={video.snippet.description} />
                        </>
                )})}
        </>
    );
}

export default Videos;
