import "./TopPosts.css"

import first from "./first.jpg"
import second from "./second.jpg"
import third from "./third.jpg"
import fourth from "./fourth.jpg"

function TopPosts(){
    return(
        <ul className="w3-ul w3-hoverable w3-white">
            <a className={"hyper-link"} href={"https://www.youtube.com/watch?v=vtvsOsqk3yU"}>
                <li className="w3-padding-16">
                    <img src={first} alt="Ακραία διλήμματα που δεν είχες σκεφτεί" className="w3-left w3-margin-right half-size"/>
                    <span className="w3-large">Ask Ioannina 15: Ακραία διλήμματα που δεν είχες σκεφτεί</span><br/>
                    <span>
                        Είμαστε στο κέντρο των Ιωαννίνων και θέτουμε σε κόσμο ακραία διλήμματα
                    </span>
                </li>
            </a>
            <a className={"hyper-link"} href={"https://www.youtube.com/watch?v=mAxIP-ntVT8"}>
                <li className="w3-padding-16">
                    <img src={second} alt="Ask Ioannina 9: Εσύ τι θα διάλεγες??? (feat Alexandra)" className="w3-left w3-margin-right half-size"/>
                    <span className="w3-large">Ask Ioannina 9: Εσύ τι θα διάλεγες??? (feat Alexandra)</span><br/>
                    <span>Είμαστε στο κέντρο των Ιωαννίνων, γυρίζουμε το Ask Ioannina 9 και ρωτάμε τον κόσμο ακραία διλλήματα:</span>
                </li>
            </a>
            <a className={"hyper-link"} href={"https://www.youtube.com/watch?v=3SKd_JJV8kk"}>
                <li className="w3-padding-16">
                    <img src={third} alt="Ask Ioannina 18 | ΠΟΙΟ ΕΙΝΑΙ ΤΟ ΜΕΓΑΛΥΤΕΡΟ ΨΕΜΑ ΠΟΥ ΕΧΕΙΣ ΠΕΙ ???" className="w3-left w3-margin-right half-size"/>
                    <span className="w3-large">Ask Ioannina 18 | ΠΟΙΟ ΕΙΝΑΙ ΤΟ ΜΕΓΑΛΥΤΕΡΟ ΨΕΜΑ ΠΟΥ ΕΧΕΙΣ ΠΕΙ ???</span><br/>
                    <span>Είμαστε στο κέντρο των Ιωαννίνων και ρωτάμε κόσμο για το μεγαλύτερο ψέμα που έχει πει !!!</span>
                </li>
            </a>
            <a className={"hyper-link"} href={"https://www.youtube.com/watch?v=o001cxNXMgE"}>
                <li className="w3-padding-16 w3-hide-medium w3-hide-small">
                    <img src={fourth} alt="Ask Ioannina 16: Ποιο είναι το πιο ακραίο περιστατικό που σου έτυχε στο σχολείο ?" className="w3-left w3-margin-right half-size"/>
                    <span className="w3-large">Ask Ioannina 16: Ποιο είναι το πιο ακραίο περιστατικό που σου έτυχε στο σχολείο ?</span><br/>
                    <span>
                        Είμαστε στο κέντρο των Ιωαννίνων και ζητάμε από κόσμο να μας πει για το πιο ακραίο περιστατικό που του έτυχε στο σχολείο !!!
                    </span>
                </li>
            </a>
        </ul>
    );
}

export default TopPosts;
