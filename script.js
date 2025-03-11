const apiKey = "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";
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
    const userText = userInput.value.trim();
    if (userText === "") return;

    appendMessage("Você", userText);
    userInput.value = "";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: userText }]
            })
        });

        if (response.status === 429) {
            throw new Error("Muitas requisições! Aguarde alguns segundos.");
        }

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        // A resposta de ChatGPT pode vir de maneira diferente dependendo da versão
        // Assumindo que você esteja utilizando a estrutura correta da API v1
        const messageContent = data.choices[0].message.content;

        // Adiciona a mensagem ao chat
        appendMessage("ChatGPT", messageContent);
    } catch (error) {
        appendMessage("Erro", error.message);
    }
}

function appendMessage(sender, message) {
    const messageElement = document.createElement("p");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
