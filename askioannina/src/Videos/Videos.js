import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleVideoComponent from "./SingleVideoComponent";
import youtube_api from "../API/youtube";
import Navigation from "../Router/Navigation";


function Videos() {
    const [allResults, setVideos] = useState([]);

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

    const videos = [];

    // deleting all unnecessary elements and keeping only videos
    allResults.forEach((result)=>{
        if(result.id.kind === "youtube#video"){
            videos.push(result);
        }
    });


    const elements = [];

    for (let i = 0; i < videos.length; i+=3) {
        elements.push(
            <div key={i} className="w3-row">
                <div key={i} className="w3-col l4">
                    <SingleVideoComponent
                        date={videos[i].snippet.publishedAt.split("T")[0]}
                        link={videos[i].id.videoId}
                        image={videos[i].snippet.thumbnails.high.url}
                        title={videos[i].snippet.title}
                        fullDescription={videos[i].snippet.description}
                    />
                </div>

                {i+1<videos.length&&(<div key={i+1} className="w3-col l4">
                    <SingleVideoComponent
                        date={videos[i+1].snippet.publishedAt.split("T")[0]}
                        link={videos[i+1].id.videoId}
                        image={videos[i+1].snippet.thumbnails.high.url}
                        title={videos[i+1].snippet.title}
                        fullDescription={videos[i+1].snippet.description}
                    />
                </div>)}

                {i+2<videos.length&&(
                <div key={i+2} className="w3-col l4">
                    <SingleVideoComponent
                        date={videos[i+2].snippet.publishedAt.split("T")[0]}
                        link={videos[i+2].id.videoId}
                        image={videos[i+2].snippet.thumbnails.high.url}
                        title={videos[i+2].snippet.title}
                        fullDescription={videos[i+2].snippet.description}
                    />
                </div>)}
            </div>
        );
    }

    return (
        <>
            <Navigation/>
            <div className="w3-margin w3-margin-top" >
                {elements}
            </div>
        </>
    );
}

export default Videos;
