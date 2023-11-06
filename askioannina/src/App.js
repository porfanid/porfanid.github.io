import {createBrowserRouter, RouterProvider} from "react-router-dom"
import AboutPage from "./AboutPage/AboutPage";
import Videos from "./Videos/Videos";
import SideBar from "./AboutPage/SideBar";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import "./App.css";
import 'react-social-icons/instagram'
import 'react-social-icons/youtube'
import TopPosts from "./top-posts/topPosts";
import Footer from "./Footer/Footer";
import HomePage from "./HomePage/HomePage";
import Tags from "./tags/tags";

function App() {
    // initialize a browser router
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/about",
            element: <AboutPage />,
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
                    <div className="w3-col l9 s12 justify-content-center w3-card" >
                        <RouterProvider router={router} />
                    </div>

                    <div className="w3-col l3">
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
                                    <Tags/>
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
