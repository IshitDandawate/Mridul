let fetching = false;
let fetchQueue = 0;
let echoText = '';

const setFetchQueue = (value) => {
  fetchQueue = value;
};

const setFetching = (value) => {
  fetching = value;
};

const setEchoText = (text) => {
  echoText = text;
};

const user1SelectorBtn = document.querySelector('#john-selector');
const user2SelectorBtn = document.querySelector('#jane-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'User 1' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
  });
};

let messageSender = 'User 1';

const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${messageSender} ...`;
  chatInput.placeholder = `Type here, ${messageSender}...`;

  if (name === 'User 1') {
    user1SelectorBtn.classList.add('active-person');
    user2SelectorBtn.classList.remove('active-person');
  }
  if (name === 'User 2') {
    user2SelectorBtn.classList.add('active-person');
    user1SelectorBtn.classList.remove('active-person');
  }

  chatInput.focus();
};

user1SelectorBtn.onclick = () => updateMessageSender('User 1');
user2SelectorBtn.onclick = () => updateMessageSender('User 2');

const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  };

  sendEcho(chatInput.value);

  messages.push(message);
  localStorage.setItem('messages', JSON.stringify(messages));

  chatMessages.innerHTML += createChatMessageElement(message);

  chatInputForm.reset();

  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener('submit', sendMessage);

clearChatBtn.addEventListener('click', () => {
  localStorage.clear();
  chatMessages.innerHTML = '';
});

async function sendEcho(text) {
  try {
    const response = await fetch("http://127.0.0.1:5050/echo", {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ Title: text })
    });
    const jsonData = await response.json();
    console.log(jsonData['echo']);
    const score = jsonData['echo'][2]['score'];
    if(score > 0.6){
      alert("Be Nice.    Negativity Score is :    "+ score);
    }
  } catch (e) {
    console.log(e);
  }
}


