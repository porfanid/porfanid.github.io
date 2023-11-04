import { initializeApp } from 'firebase/app';
import {getToken,  getMessaging} from 'firebase/messaging';
import {useState} from "react";



const firebaseConfig = {
    apiKey: "AIzaSyCuZ4dAjkNOuCXQKCglCRnUxAPzRjS80g8",
    authDomain: "pavlos-quantum-loop.firebaseapp.com",
    projectId: "pavlos-quantum-loop",
    storageBucket: "pavlos-quantum-loop.appspot.com",
    messagingSenderId: "156328566952",
    appId: "1:156328566952:web:5858f21259dec75dd9e29d"

};


const messaging_api_key = " BL4Byyt9qRnveVa81DjwsaPkz1jCvmpUsP3K1gCXXquSIBTIumco79w51xGdJcIYYyTA4Ni8fQ-yyEbXr-Uqh2A";
const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

async function EnableMessaging(callback) {
    const [isTokenFound, setTokenFound] = useState(false);
    await getTokenAPI(setTokenFound);
    if(isTokenFound) {
        messaging.onBackgroundMessage(function (payload) {
            console.log('Received background message ', payload);

            const notificationTitle = payload.notification.title;
            const notificationOptions = {
                body: payload.notification.body,
            };

            console.log(notificationTitle);
            console.log(notificationOptions)

            //self.registration.showNotification(notificationTitle,
            //    notificationOptions);
        });
    }
}



export const getTokenAPI = (setTokenFound) => {
    return getToken(messaging, {vapidKey: messaging_api_key}).then((currentToken) => {
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            setTokenFound(true);
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            setTokenFound(false);
            // shows on the UI that permission is required
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

export default EnableMessaging;
