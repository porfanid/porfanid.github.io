import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import donate_image from "../donate.png";
import {SocialIcon} from "react-social-icons";
import "./Footer.css"

function Footer(){
    return (
        <footer className="bg-dark text-light py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h3>Contact Us</h3>
                        <p><FontAwesomeIcon icon={faEnvelope} /> Email: <a href={"mailto:billakigr16@gmail.com"}>billakigr16@gmail.com</a></p>
                    </div>
                    <div className="col-md-4">
                        <h3>Quick Links</h3>
                        <ul className="list-unstyled">
                            <a href={"https://revolut.me/vasileyyk7"}>
                                <img style={{width: "30%"}} src={donate_image} alt={"Donate"}></img>
                            </a>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h3>Follow Us</h3>
                        <SocialIcon className="text-light w3-margin-right" url="https://www.instagram.com/billykraniwtis/" />
                        <SocialIcon className="text-light" url="https://www.youtube.com/@billykraniotis947" />
                    </div>
                </div>
                <div className="container">
                    <div className={"row"}>
                        <div className="col-md-4"></div>
                        <div className="col-md-4">Designed by <a href={"https://pavlos.orfanidis.net.gr"}>Pavlos Orfanidis</a> and <a href={"https://vaggelis.thequantumloop.com"}>Vaggelis Tzimas</a></div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer
