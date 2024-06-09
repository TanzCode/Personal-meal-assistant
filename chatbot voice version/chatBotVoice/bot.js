// Selecting necessary elements from the DOM
const chatContainer = document.querySelector(".container"); //select main chat container element
const chatContain = document.querySelector(".chat-contain");//select message display area

const msgInput = document.querySelector("#msgInput");//select input field to type text
const msgSend = document.querySelector(".msgSend");//select send button

const loadingEle = document.querySelector(".loading");//select loading indicator
const refresh = document.querySelector(".refreshCon");//select refresh button
const toglerButton = document.querySelector(".chatbot-toggler");//select the chat button(visibility of chat)
const mic = document.querySelector(".mic-voice");//select mice button


//chatbot container view togler chat button 
toglerButton.addEventListener("click",viewChat);
function viewChat(){
    chatContainer.classList.toggle('show-container');

};


// Starting message from the bot
const startingMessage = "Welcome to the <b>Balance Bite 💗 Health Care</b>.<br> How can I help you today.";

// Initialize the chat with the starting message
function initializeChat() {
    renderMessage(startingMessage, 'bot'); // Render the starting message from the bot
    setScrollPosition(); // Set scroll position to the bottom
};



//event listner to the refresh button 
refresh.addEventListener("click",ref );
function ref() {
    location.reload();
};

// Event listener for when the send button is clicked
msgSend.addEventListener("click", renderUserMessage); 

// Event listener for when the Enter key is pressed in the message input field
msgInput.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) { // Check if the key pressed is Enter
        renderUserMessage(); // Render the user's message
        setScrollPosition(); 
    }
});

// Function to render user's message
function renderUserMessage() {
    const userInput = msgInput.value; // Get user input from the text input field
    renderMessage(userInput, "user"); // Render the user's message in the chat interface
    msgInput.value = ""; // Clear the input field
    toggleLoading(false); // Hide the loading indicator
    setTimeout(() => {
        
        setScrollPosition(); // Adjust scroll position after rendering messages
        renderChatbotResponse(userInput); // Render the chatbot's response after a delay
        toggleLoading(true); // Show the loading indicator
        setScrollPosition();
    }, 900); // Delay before showing the chatbot's response
}

// Function to render chatbot's response
function renderChatbotResponse(userInput) {
    const res = getChatbotResponse(userInput); // Get chatbot's response based on user input
    toggleLoading(false);
    renderMessage(res); // Render chatbot's response in the chat interface
    toggleLoading(true);
    suggest(userInput);
    toggleLoading(true);
    setScrollPosition();
    
}

// Function to render a message element in the chat interface
function renderMessage(html, type = "bot") {
    // Determine the class name based on the message type
    // If type is "user", use "user-message"; otherwise, use "bot-message"
    const className = type === "user" ? "user-message" : "bot-message";

    // Create a new <div> element, set its class, and inner HTML
    const messageElement = document.createElement("div");
    messageElement.classList.add(className);
    messageElement.innerHTML = html;

    chatContain.appendChild(messageElement);   // Append the new message element to the chat container

    if (type === "bot") {
        const button = document.createElement("button");
        button.className = 'icon-button';
        button.addEventListener('click', function() {
            const speech = new SpeechSynthesisUtterance();
            speech.text = messageElement.innerText; // Use innerText to get the text content
            let voices = window.speechSynthesis.getVoices();
            speech.voice = voices[1];
            
            window.speechSynthesis.speak(speech);
        });
        messageElement.appendChild(button);
    }
}


// Function to set scroll position to the bottom of the chat container
function setScrollPosition() {
    chatContain.scrollTop = chatContain.scrollHeight;
}

// Function to toggle loading indicator
function toggleLoading(show) {
    loadingEle.classList.toggle("hide", show);
}

// Initialize the chat with the starting message
initializeChat();

function handleSuggestionClick(suggestion){
    handleSuggestionClick(suggestion);
}

//User voice input

function voiceInput(){
    const recognition = new webkitSpeechRecognition(); // Create speech recognition object
    recognition.lang = 'en-UK'; 
    
    // Start speech recognition
    recognition.start();
    
    // Event listener to recognized
    recognition.onresult = function(event) {
        const result = event.results[0][0].transcript; // Get the recognized text
        msgInput.value = result; // Display the text in the input field
        renderUserMessage();//after the voice input the message automaticaly
   
    };
    
    // Event listener for errors
    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
    };
};
//event listner to the mic buttob
mic.addEventListener("click", voiceInput);

