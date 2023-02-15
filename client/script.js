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