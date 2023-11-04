import {createBrowserRouter, RouterProvider} from "react-router-dom"
import HomePage from "./HomePage/HomePage";
import Videos from "./Videos/Videos";
import SideBar from "./HomePage/SideBar";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import "./App.css";
import 'react-social-icons/instagram'
import 'react-social-icons/youtube'
import TopPosts from "./top-posts/topPosts";
import Footer from "./Footer/Footer";

function App() {
    // initialize a browser router
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/videos",
            element: <Videos />,
        },
    ])

    return (
        <>
            <div className="w3-content" style={{ maxWidth: "100%" }}>
                <header className="w3-padding-32 w3-padding-top-64">
                    <h1><b>AskIoannina</b></h1>
                    <p>Welcome to the personal page of <a href={"https://www.youtube.com/@billykraniotis947"}><span className="w3-tag">Billy Kraniotis</span></a></p>
                </header>

                <div className={"w3-row"} style={{height: "100%"}}>
                    <div className="w3-col l8 s12 justify-content-center w3-card" >
                        <RouterProvider router={router} />
                    </div>

                    <div className="w3-col l4">
                        <SideBar/>
                        <hr/>
                        <div className="w3-card w3-margin">
                            <div className="w3-container w3-padding">
                                <h4>Popular Posts</h4>
                            </div>
                            <TopPosts/>
                        </div>
                        <hr/>
                        <div className="w3-card w3-margin">
                            <div className="w3-container w3-padding">
                                <h4>Tags</h4>
                            </div>
                            <div className="w3-container w3-white">
                                <p>
                                    <span className="w3-tag w3-black w3-margin-bottom">Travel</span> <span className="w3-tag w3-light-grey w3-small w3-margin-bottom">New York</span> <span className="w3-tag w3-light-grey w3-small w3-margin-bottom">London</span>
                                    <span className="w3-tag w3-light-grey w3-small w3-margin-bottom">IKEA</span> <span className="w3-tag w3-light-grey w3-small w3-margin-bottom">NORWAY</span> <span className="w3-tag w3-light-grey w3-small w3-margin-bottom">DIY</span>
                                    <span className="w3-tag w3-light-grey w3-small w3-margin-bottom">Ideas</span> <span className="w3-tag w3-light-grey w3-small w3-margin-bottom">Baby</span> <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">Family</span>
                                    <span className="w3-tag w3-light-grey w3-small w3-margin-bottom">News</span> <span className="w3-tag w3-light-grey w3-small w3-margin-bottom">Clothing</span> <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">Shopping</span>
                                    <span className="w3-tag w3-light-grey w3-small w3-margin-bottom">Sports</span> <span className="w3-tag w3-light-grey w3-small w3-margin-bottom">Games</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div><br/>
            </div>
            <Footer/>
        </>
    )
}

export default App
