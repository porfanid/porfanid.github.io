import "./Video.css"
function SimpleVideoComponent(props){


    /**const [video, setVideo] = useState({});

    const videoId = props.videoId;

    useEffect(() => {
        const API_KEY = youtube_api();
        const VIDEO_ID = videoId;

        const requestUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${VIDEO_ID}&part=snippet`;
        console.log(requestUrl);
        axios
            .get(requestUrl)
            .then((response) => {
                setVideo(response.data.items[0]);
            })
            .catch((error) => {
                console.error('Error fetching video details:', error);
            });
    }, [videoId]);
*/


    return (
        <a href={"https://www.youtube.com/watch?v="+props.link}>
        <div className="w3-card-4 w3-margin w3-white">
            <img class="thumbnail" src={props.image} alt="{props.title}"/>
            <div className="w3-container">
                <h3><b>{props.title}</b></h3>
                <h5><span className="w3-opacity">{props.date}</span></h5>
            </div>
            <div className="w3-container">
                <p>{props.fullDescription}</p>
            </div>
        </div>
        </a>
    );
}

export default SimpleVideoComponent;
