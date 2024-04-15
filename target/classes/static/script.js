


var stompClient = null;


function sendMessage(){
    let jsonOb={
        name:localStorage.getItem("name"),
        content:$("#message-value").val()
    }
    stompClient.send("/app/message",{},JSON.stringify(jsonOb));
}

function connect() {
    let socket = new SockJS("/server1");

    // Stomp will run over the socket
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        console.log("Connected " + frame);

        // Hide login form and show chat room
        $("#name-form").addClass('d-none');
        $("#chat-room").removeClass("d-none");

        // Subscribe to the topic to receive messages
        stompClient.subscribe("/topic/return-to", function(response) {
            showMessage(JSON.parse(response.body));
        });
    });
}

// Function to display the received message
function showMessage(message) {
    $("#message-container-table").prepend(`<tr><td><b>${message.name}:</b> ${message.content}</td></tr>`);
}

$(document).ready(() => {
    $("#login").click(() => {
        let name = $("#name-value").val();
        localStorage.setItem("name", name);

        $("#name-title").text("Welcome  "+  name)

        connect();
    });

    $("#send-btn").click(()=>{
        sendMessage()
    })

    $("#logout").click(()=>{
        localStorage.removeItem("name")

        if(stompClient!==null){
            stompClient.disconnect();
            $("#name-form").removeClass('d-none');
            $("#chat-room").addClass("d-none");
        }
    })
});
