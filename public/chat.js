const socket = io.connect('http://localhost:3000')
// dom 
const handle = document.getElementById('handle')
const message = document.getElementById('message')
const output = document.getElementById('output')
let feedback  = document.getElementById('feedback')
const send = document.getElementById('send')

// submit events
send.addEventListener('click', (e) => {
    socket.emit('chat', {
        handle : handle.value,
        message : message.value
    })
   
})
message.addEventListener('keydown', e => {
    socket.emit('typing', {
        handle : handle.value,
        isTyping : true
    })
})

message.addEventListener('keyup', e => {
    setTimeout(() => {
        socket.emit('typing', {
            handle : handle.value,
            isTyping : false
        })
    }, 1000);
})
// listen for events
socket.on('chat', data => {
    output.innerHTML += `<p> <span style ='font-size : .8em'> ${data.handle} </span> <br>  <strong> ${" "+data.message} </strong>  </p>`
})

socket.on('typing', data => {
    if(data.isTyping){
        feedback.innerHTML = `<p>${data.handle ? data.handle : 'someone'} is typing ...</p>`
    }else {
        feedback.innerHTML = ' '
    }
})
