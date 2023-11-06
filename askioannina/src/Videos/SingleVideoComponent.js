import "./Video.css"
import React from "react";
function SimpleVideoComponent(props){


    return (
        <a href={"https://www.youtube.com/watch?v="+props.link}>
            <div className="w3-card w3-margin w3-white">
                <img className={"thumbnail"} src={props.image} alt={props.title}/>
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
