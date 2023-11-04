import billy from "./billy.jpg";
import alexandra from "./alaxandra.JPG";

function SideBar() {
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4 shadow">
                        <img src={billy} alt="Billy Kraniotis" className="card-img-top" />
                        <div className="card-body">
                            <h4 className="card-title"><b>Βασίλης Κρανιώτης</b></h4>
                            <p className="card-text"></p>
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="card mb-4 shadow">
                        <img src={alexandra} alt="Alexandra Patsoura" className="card-img-top" />
                        <div className="card-body">
                            <h4 className="card-title"><b>Αλεξάνδρα Πατσούρα</b></h4>
                            <p className="card-text">
                                Just me, myself and I, exploring the universe of unknownment. I have a heart of love and an interest in lorem ipsum and mauris neque quam blog. I want to share my world with you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
