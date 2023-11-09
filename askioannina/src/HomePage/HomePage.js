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
            <img src={profilePicture.url} height={profilePicture.height} width={profilePicture.width}></img>
            <p>Δύο περίεργοι και αστείοι YouTubers από την επαρχία της Ελλάδας έχουν δημιουργήσει ένα εξαιρετικά δημοφιλές <a href={"https://youtube.vom/@billykraniotis947"}>κανάλι στο YouTube</a>. Αυτό που τους κάνει ξεχωριστούς είναι η αγάπη τους για τις ερωτήσεις και η διάθεσή τους να τολμούν.</p>
            <p>Καθημερινά βγαίνουν στους δρόμους της επαρχιακής πόλης τους με την κάμερα στο χέρι, έτοιμοι να ρωτήσουν τον κόσμο ό,τι κι αν τους έρθει στο μυαλό. Από αστείες και αναπάντητες ερωτήσεις όπως "Ποιο είναι το πιο σπαστικό πράγμα σε μία σχέση;" μέχρι και "Ποιό είναι το μεγαλύτερο ψέμμα που έχεις πει;".</p>
            <p>Οι απαντήσεις που λαμβάνουν είναι πάντα πρωτότυπες και ανατρεπτικές, κάτι που καθιστά τα βίντεό τους αξιοθέατα. Ο τρόπος που συνδυάζουν τις ερωτήσεις τους με το χιούμορ τους δημιουργεί ένα μοναδικό εγχείρημα που τραβάει την προσοχή των θεατών τους.</p>
            <p>Με το πρωτοποριακό τους περιεχόμενο, οι δύο YouTubers έχουν αποκτήσει μια ευρεία κοινότητα φανς που παρακολουθεί καθημερινά τις αναρτήσεις τους. Είναι σίγουρα μια αναζωογονητική προσθήκη στον κόσμο του YouTube και στην τοπική κοινότητά τους.</p>
        </>
    );
}

export default HomePage
