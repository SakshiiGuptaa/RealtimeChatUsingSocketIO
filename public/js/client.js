const socket  = io('http://localhost:8000');

socket.on('messagee',messag =>{
    console.log(messag);
})
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInt');
const messageContainer = document.querySelector(".container");
var audio = new Audio('MessageNotification.mp3');

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText  = message ;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();       // reload hone ko rokta h 
    const message = messageInput.value;
    append(`You: ${message}`,'right'); //form k andr message aajata h 
    socket.emit('send', message);
    messageInput.value ='';
});


const nam = prompt("Enter your name to join...");
socket.emit('userJoined' , nam);

socket.on('userjoin', nam =>{
    append(`${nam} joined the chat`,'right')
})


socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`,'left')
})
socket.on('left' , nam =>{
    append(`${nam} left the chat`, 'left')
})
