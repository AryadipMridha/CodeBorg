import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const charContainer = document.querySelector('#charContainer');

let loadInterval;

function loader(element) {
    element.textContent = ''; //to ensure its emply at start

    loadInterval = (() => {
        element.textContent = '.';

        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300)
}

function typeText(element, text) {
    let index = 0;
    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 20)
}

function generateUniqueId() {
    const timestamp = Date.now();
    const randomnumber = Math.random();
    const hexadecimalString = randomnumber.toString(16);

    return 'id-$(timestamp)-$(hexadecimalString)';


}

function chatstripe(isAi, value, uniqueId) {
    return (
        //`` this is template string
        `
        <div class="wrapper ${isAi && 'ai'}" >
            <div class="chat" >
                < div className="profile" >
                    <img src="${isAi ? bot : user}"
                        alt="${isAi ? 'bot' : 'user'}" />
                </div>
                <div class="message" id="${uniqueId}">${value}</div>
            </div>
        </div>
        `
    )
}


const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    //user chatStripe
    chatContainer.innerHTML += chatstripe(false, data.get('prompt'));


    //text area clear
    form.reset();

    //bot's Chatstripe
    //uid for GPT uid
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatstripe(true, " ", uniqueId);
    // " " because it will be filled later

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv = Document.getElementById(uniqueId);

    loader(messageDiv);
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
    if (e.KeyCode === 13) {
        handleSubmit(e);
    }
})