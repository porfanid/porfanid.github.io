import Navigation from "../Router/Navigation";
import youtube_api from "../API/youtube";
import {useEffect, useState} from "react";
import axios from "axios";

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
                    <form>
                   <div className="Form-group">
                       <label for="Ονοματεπωνυμο ">Ονοματεπωνυμο</label>
                       <input type="email" className="form-control m-1 p-2" placeholder="Ονοματεπωνυμο"></input>
                       <label for="Θεμα ">Θεμα</label>
                       <input type="text" className="form-control m-1 p-2" placeholder="Θεμα"></input>
                        <label for="Θεμα ">Περιοχη </label>
                        <input type="text" className="form-control m-1 p-2" placeholder="Περιοχη"></input>
                         <button type="submit" className="btn btn-outline-primary m-2 p-1 w-100">submit</button>
                       </div>
                    </form>
                    </div>
                    <div className="col-md-6 p-1 m-3">
                        <h3>Σου αρεσει το ask ioannina ? Παρε μας εναν καφε για να συνεχισουμε !</h3>
                        <button className="btn btn-danger w-100 mt-3">Donate!</button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default HomePage
