const botMessageAreaa = document.querySelector("#botMessageArea");
const chatBody = document.querySelector(".chat-body");
const sendMessageBtn = document.querySelector("#send-message");
const userData = {
  message: null,
};
const API_KEY = "AIzaSyBex6ES91h8cfhrkqZXoD-DFyDQ4NNyFQU";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

const generateBotRespnse = async (ingoingMessageDiv) => {
  const messageElement=ingoingMessageDiv.querySelector('.message-text');
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: userData.message }] }],
    }),
  };
  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);
    console.log(data);
    const apiResponeText=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
    messageElement.innerHTML=apiResponeText
  } catch (error) {
    console.log(error);
    messageElement.innerHTML=error.message;
    messageElement.style.color='#ff0000'

  }finally{
    ingoingMessageDiv.classList.remove('thinking')
  chatBody.scrollBy({top:chatBody.scrollHeight,behavior:'smooth'})

  }
};
function handleOutgoingMessage(e) {
  e.preventDefault();
  userData.message = botMessageAreaa.value.trim();
  botMessageAreaa.value = "";
  const messageContent = ` <div class="message-text"></div>`;
  const outgoingMessageDiv = createMessageElement(
    messageContent,
    "user-message"
  );
  outgoingMessageDiv.querySelector(".message-text").textContent =
    userData.message;
  chatBody.appendChild(outgoingMessageDiv);
  chatBody.scrollBy({top:chatBody.scrollHeight,behavior:'smooth'})
  setTimeout(() => {
    const messageContent = `
     <img class="chat-logo" src="assets/svg/icon.svg" alt="" />
     <div class="message-text">
            <div class="thinking-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
           </div>
     </div>
     `;
    const ingoingMessageDiv = createMessageElement(
      messageContent,
      "bot-message",
      "thinking"
    );
    outgoingMessageDiv.querySelector(".message-text").textContent =
      userData.message;
    chatBody.appendChild(ingoingMessageDiv);
  chatBody.scrollBy({top:chatBody.scrollHeight,behavior:'smooth'})
    generateBotRespnse(ingoingMessageDiv);
  }, 600);
}

botMessageAreaa.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  if (e.key === "Enter" && userMessage) {
    handleOutgoingMessage(e);
  }
});

sendMessageBtn.addEventListener("click", (e) => handleOutgoingMessage(e));

//generate  responses  based on user messages using the free gemini API
