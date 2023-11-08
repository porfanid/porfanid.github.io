import axios from 'axios';


const viberApiToken = '51e9a60ddf27e10e-170116cc0945c0a-1308888e03cccb00';

function send_message(text, userPhoneNumber='306988507680'){
    //const  = ;
    axios.get(`https://chatapi.viber.com/pa/get_account_info?phone=${userPhoneNumber}`, {
        headers: {
            'X-Viber-Auth-Token': viberApiToken,
        },
    })
    .then((response) => {
        const userInfo = response.data;
        const userId = userInfo.id;
        send_message_to_api(userId, text);
    })
    .catch((error) => {
        console.error('Failed to get user info');
    });
}

function send_message_to_api(user_id, text) {
    const contactData = {
        receiver: user_id, // Replace with the recipient's Viber user ID
        text: text,
    };
    const viberApiUrl = 'https://chatapi.viber.com/pa/send_message';
    axios.post(viberApiUrl, contactData, {
        headers: {
            'X-Viber-Auth-Token': viberApiToken,
        },
    })
    .then((response) => {
        console.log('Message sent to Viber:', response.data);
    })
    .catch((error) => {
        console.error('Failed to send message to Viber:', error);
    });
}

export default send_message;
