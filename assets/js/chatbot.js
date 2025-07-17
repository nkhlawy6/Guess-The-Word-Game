const botMessageAreaa = document.querySelector("#botMessageArea");
const chatBody = document.querySelector(".chat-body");
const sendMessageBtn = document.querySelector("#send-message");
const userData = {
  message: null,
};

const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
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
  }, 600);
}

botMessageAreaa.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  if (e.key === "Enter" && userMessage) {
    handleOutgoingMessage(e);
  }
});

sendMessageBtn.addEventListener("click", (e) => handleOutgoingMessage(e));
