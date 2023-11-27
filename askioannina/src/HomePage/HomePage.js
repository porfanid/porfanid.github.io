import Navigation from "../Router/Navigation";
import youtube_api from "../API/youtube";
import {useEffect, useState} from "react";
import axios from "axios";
import emailjs from '@emailjs/browser';



const sendEmail = async (formData) => {
    emailjs.send('service_dtvb8qu', 'template_tuv6wqh', formData, 'wj0cTngbvm4rD48YO')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
};

// Call the function to send the email




function HomePage(){




    const API_KEY = youtube_api();
    const CHANNEL_ID = "UCVnuhNpZ6W3gSq8PhgsFz-g";

    const [profilePicture, setProfilePicture] = useState("");
    useEffect(() => {
        console.log(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${CHANNEL_ID}&key=${API_KEY}`)
        axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${CHANNEL_ID}&key=${API_KEY}`)
            .then((response) => {
                setProfilePicture(response.data.items[0].snippet.thumbnails.high);
            }).catch((error) => {
            console.error('Error fetching image from youtube');
        });
    }, [API_KEY, CHANNEL_ID]);

    const [formData, setFormData] = useState({
        name: '',
        thema: '',
        area: '',
        message: '',
    });

    // Event handler for input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Event handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        sendEmail(formData).then(r=>console.log("Error: "+r));
        console.log('Form submitted with data:', formData);
    };

    return (
        <>
            <Navigation/>

            <div className="MainBrand text-center">
            <img className="img-fluid  rounded-circle w-25 youtubeImg" src={profilePicture.url} alt={"Youtube Profile"} height={profilePicture.height} width={profilePicture.width}></img>
            <h3>Tο καναλι μας </h3>
            <hr></hr>
            <div className="BrandContent text-black">
            <p>Δύο περίεργοι και αστείοι YouTubers από την επαρχία της Ελλάδας έχουν δημιουργήσει ένα εξαιρετικά δημοφιλές <a href={"https://youtube.vom/@billykraniotis947"}>κανάλι στο YouTube</a>. Αυτό που τους κάνει ξεχωριστούς είναι η αγάπη τους για τις ερωτήσεις και η διάθεσή τους να τολμούν.</p>
            <p>Καθημερινά βγαίνουν στους δρόμους της επαρχιακής πόλης τους με την κάμερα στο χέρι, έτοιμοι να ρωτήσουν τον κόσμο ό,τι κι αν τους έρθει στο μυαλό. Από αστείες και αναπάντητες ερωτήσεις όπως "Ποιο είναι το πιο σπαστικό πράγμα σε μία σχέση;" μέχρι και "Ποιό είναι το μεγαλύτερο ψέμμα που έχεις πει;".</p>
            <p>Οι απαντήσεις που λαμβάνουν είναι πάντα πρωτότυπες και ανατρεπτικές, κάτι που καθιστά τα βίντεό τους αξιοθέατα. Ο τρόπος που συνδυάζουν τις ερωτήσεις τους με το χιούμορ τους δημιουργεί ένα μοναδικό εγχείρημα που τραβάει την προσοχή των θεατών τους.</p>
            <p>Με το πρωτοποριακό τους περιεχόμενο, οι δύο YouTubers έχουν αποκτήσει μια ευρεία κοινότητα φανς που παρακολουθεί καθημερινά τις αναρτήσεις τους. Είναι σίγουρα μια αναζωογονητική προσθήκη στον κόσμο του YouTube και στην τοπική κοινότητά τους.</p>
            </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <hr></hr>
            <h3 className="text-center text-black">Εχεις κατι να μοιραστεις ΕΠΙΚΟΙΝΩΝΗΣΕ!?</h3>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 p-1 m-3">
                        <form onSubmit={handleSubmit}>
                            <div className="Form-group">
                                <label htmlFor="name">Ονοματεπωνυμο</label>
                                <input
                                    name="name"
                                    type="text"
                                    className="form-control m-1 p-2"
                                    placeholder="Ονοματεπωνυμο"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="thema">Θεμα</label>
                                <input
                                    name="thema"
                                    type="text"
                                    className="form-control m-1 p-2"
                                    placeholder="Θεμα"
                                    value={formData.thema}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="area">Περιοχη</label>
                                <input
                                    name="area"
                                    type="text"
                                    className="form-control m-1 p-2"
                                    placeholder="Περιοχη"
                                    value={formData.area}
                                    onChange={handleInputChange}
                                />
                                <textarea
                                    name="message"
                                    className="form-control m-1 p-2"
                                    rows="15"
                                    placeholder="Type your text"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                />
                                <button type="submit" className="btn btn-outline-primary m-2 p-1 w-100">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6 p-1 m-3">
                        <h3>Σου αρεσει το ask ioannina ? Παρε μας εναν καφε για να συνεχισουμε !</h3>
                        <a href={"https://revolut.me/vasileyyk7"} className="btn btn-danger w-100 mt-3">Donate!</a>
                    </div>
                </div>

            </div>
        </>
    );
}

export default HomePage
