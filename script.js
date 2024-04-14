const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
let output = "no value in output varible";
let botDiv;
let userMessage;

const Genral = "";
const genralDiv = document.querySelector(".bottom .genral");
const DBMS = "";
const COA = "";
const OS = "";
const SE = "";
const defaltText = document.createElement("h1");
defaltText.classList.add("DefaultText");
defaltText.innerHTML = ` Hello, I am Master Chat AI <br>
    How can I help you today?`;
chatBox.innerHTML = defaltText.outerHTML;

let aiPersona = Genral;

let genralChatArr = {
  bot: [],
  user: [],
};
localStorage.setItem("genralChatArr", JSON.stringify(genralChatArr));

// chalo localhost me chat save kar lete hain
function setInLocalHost(userMsg, botMsg) {
  genralChatArr.user.push(userMsg);
  genralChatArr.bot.push(botMsg);
  localStorage.setItem("genralChatArr", JSON.stringify(genralChatArr));
}
console.log(JSON.parse(localStorage.getItem("genralChatArr")).user[0]);

function GeminiResponse(msg) {
  // const API_KEY = "AIzaSyDAMBuPY1NqHhuC9Rf2wG07BiXonL1NnPg";
  const API_KEY = "AIzaSyDAMBuP";

  const requestData = {
    contents: [
      {
        role: "user",
        parts: [{ text: `${msg} . ${aiPersona}` }],
      },
    ],
  };

  fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      //   console.log(data["candidates"][0]["content"]["parts"][0].text);
      output = data["candidates"][0]["content"]["parts"][0].text;
      makeBotOutput(output);

      //genralChatArr.bot.push(output); //jab gemini response dega tab localhost me save karna hai
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      output = `**Keys in DBMS (Database Management Systems)** Keys are a fundamental concept in DBMS that are used to uniquely identify records in a table. They are used to ensure data integrity and maintain the relationships between different tables. There are several types of keys in DBMS: **1. Primary Key:** * A unique identifier that uniquely identifies each row in a table. * Can be a single column or a combination of multiple columns. * Ensures that no two rows have the same value for the primary key. **2. Candidate Key:** * A set of columns that can uniquely identify rows in a table. * There can be multiple candidate keys in a table. * Only one is designated as the primary key. **3. Foreign Key:** * A column or set of columns in one table that references the primary key of another table. * Used to establish relationships between tables. * Ensures that data integrity is maintained by preventing incorrect references. **4. Alternate Key:** * A set of columns that can also uniquely identify rows in a table, but is not the primary key. * Provides additional ways to search and retrieve data. **5. Composite Key:** * A primary key that consists of multiple columns. * Used when no single column can uniquely identify rows. **6. Natural Key:** * A key that is derived from the natural attributes of a record. * Typically used for internal processing and is not always unique. **Importance of Keys:** * **Data Integrity:** Keys prevent duplicate entries and ensure that data is accurate and consistent. * **Relationships:** Foreign keys establish relationships between tables, allowing data to be linked and queried across tables. * **Performance Optimization:** Indexes are built on keys to speed up data retrieval. * **Data Replication:** Keys are used to identify and replicate data between systems, ensuring data consistency. **Choosing the Right Key:** * Consider the business requirements and the data being stored. * Identify the most suitable unique identifier for rows. * Avoid using surrogate keys (auto-generated values) if possible. * Use composite keys judiciously as they can impact performance.`;
      output = output.replace(/\*\*(.*?)\*\*/g, "</div><h4>$1</h4><div>");

      makeBotOutput(output);
      setInLocalHost(userMessage, output);
    });
}

sendBtn.addEventListener("click", appendResopnse);
function appendResopnse() {
  userMessage = userInput.value.trim();

  if (userMessage !== "") {
    if (chatBox.querySelector("h1")) {
      chatBox.innerHTML = "";
    }

    appendUserMessage(userMessage);
    GeminiResponse(userMessage);

    // Here you can call your function to send the user's message to your backend for processing and receiving a response.

    // For now, let's just simulate a bot response after a short delay.
    setTimeout(function () {
      appendBotMessage(output);
    }, 500);
    userInput.value = "";
  }
}
function appendUserMessage(message) {
  const userDiv = document.createElement("div");
  userDiv.classList.add("user-message");
  const icon = document.createElement("i");
  icon.classList.add("ri-user-star-line");
  let userText = document.createElement("p");
  userText.textContent = message;

  userDiv.appendChild(icon);
  userDiv.appendChild(userText);

  chatBox.appendChild(userDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll to bottom
}

function appendBotMessage(message) {
  botDiv = document.createElement("div");
  botDiv.classList.add("bot-message");
  makeBotOutput("Loading...");

  //   console.log(message);
  chatBox.appendChild(botDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll to bottom
}

let previous = false;

function changePersona(e) {
  chatBox.innerHTML = "";
  //   getDataFromLocalHost()
  if (previous) {
    previous.style.backgroundColor = "#ffff";
    previous.style.color = "black";
  }
  previous = e;
  previous.style.backgroundColor = "black";
  previous.style.color = "#ffff";
  aiPersona = e.innerText;
  //   console.log(aiPersona);
  let subjectName = document.querySelector("#subName");
  subjectName.innerHTML = e.innerText;

  if (chatBox.innerHTML == "") {
    chatBox.innerHTML = defaltText.outerHTML;
    // console.log(defaltText.outerHTML);
  }
}

let menu = document.querySelector("#menuBar");
menu.addEventListener("click", showNavbar);
let closeNav = document.querySelector("#closeNavbar");
closeNav.addEventListener("click", closeNavbar);

function showNavbar() {
  let navbar = document.querySelector(".left-nav");
  navbar.style.display = "block";
  menu.style.display = "none";
  
}

function closeNavbar() {
  let navbar = document.querySelector(".left-nav");

    navbar.style.display = "none";

  menu.style.display = "block";
}
userInput.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    appendResopnse();
  }
});

function makeBotOutput(output) {
  botDiv.innerHTML = "";
  let botDP = document.createElement("i");
  botDP.classList.add("ri-robot-2-fill");
  botDiv.appendChild(botDP);
  let botText = document.createElement("p");
  botText.innerHTML = output;
  botDiv.appendChild(botText);
}

function getDataFromLocalHost() {
  let n = genralChatArr.user.length;
  for (let i = 0; i <= n - 1; i++) {
    if (n > 0) {
    //  chatBox.innerHTML = "";

      appendUserMessage(
        JSON.parse(localStorage.getItem("genralChatArr")).user[i]
      );
      appendBotMessage(
        JSON.parse(localStorage.getItem("genralChatArr")).bot[i]
      );
      makeBotOutput(JSON.parse(localStorage.getItem("genralChatArr")).bot[i]);
    }
  }
}

genralDiv.addEventListener("click", getDataFromLocalHost);
