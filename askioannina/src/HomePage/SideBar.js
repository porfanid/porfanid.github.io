import billy from "./billy.jpg"
import alexandra from "./alaxandra.JPG"
function SideBar(){
    return (
        <>
            <div className="w3-card w3-margin w3-margin-top">
                <img alt={"Billy Kraniotis"} src={billy} className="full-size"/>
                <div className="w3-container w3-white">
                    <h4><b>Βασίλης Κρανιώτης</b></h4>
                    <p></p>
                </div>
            </div>

            <div className="w3-card w3-margin w3-margin-top">
                <img alt={"Alexandra Patsoura"} src={alexandra} className="full-size"/>
                <div className="w3-container w3-white">
                    <h4><b>Billy Kraniotis</b></h4>
                    <p>Just me, myself and I, exploring the universe of uknownment. I have a heart of love and a interest of lorem ipsum and mauris neque quam blog. I want to share my world with you.</p>
                </div>
            </div>
        </>
    );
}

export default SideBar;
