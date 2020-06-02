//Make connection
let socket = io.connect("http://localhost:3000")

//Color palette for chat names
let colors = [
    "#660099",
    "#ffcc00",
    "#ff9900",
    "#ff6600",
    "#ff3300",
    "#ff0000",
    "#4eee94", 
    "#0000ff",
    "#065535",
    "#003366",
    "#008000",
    "#a6008e",
    "#2f444b",
    "#68c7d4",
    "#fe6b73"
]

//Wait till document is ready
$(document).ready(() => {

    //Query the DOM
    const messageInput = $("#message-input")
    const username = $("#username-input").val()

    //Generate random chat color id for user
    const generatedColorId = getRandomColor()

    //Add message-button event listener
    $("#message-form").on("submit", (event) => {

        //Prevent page from refreshing
        event.preventDefault()

        //Emit message to server
        socket.emit("message", {
            text: messageInput.val(),
            colorId: generatedColorId,
            from: username
        })

        //Clear text input
        messageInput.val('')
    })

    //Listen for emit event
    socket.on('message', (data) => {
        appendMessage(data)
    })

})

function appendMessage(data) {
    $("#chat-messages").append(`<p><strong style="color: ${data.colorId}">${data.from}</strong>: ${data.text}</p>`)
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}