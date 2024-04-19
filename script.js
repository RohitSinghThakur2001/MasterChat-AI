
// variable diclearations

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
let menu = document.querySelector("#menuBar");
const readerMode = document.querySelector('#readerMode')

let output = "no value in output varible";
let botDiv;
let userMessage;

const genralDiv = document.querySelector(".bottom .genral");

const Genral = "";
const DBMS = `Hello I am a MCA student. If my question pertains to DBMS(Database management system), you'll provide me with an answer in that context. However, if it's not related to DBMS, you'll kindly let me know: "Sorry, that question is not related to DBMS. But if you have any queries about databases, feel free to ask!" so my question is -->`;
const COA = `Hello I am a MCA student. If my question pertains to COA(Computer Organization and Architecture), you'll provide me with an answer in that context. However, if it's not related to COA, you'll kindly let me know: "Sorry, that question is not related to Computer Organization and Architecture (COA). But if you have any queries about COA, feel free to ask!" so my question is -->`;
const OS = `Hello I am a MCA student. If my question pertains to OS(Operating System), you'll provide me with an answer in that context. However, if it's not related to OS, you'll kindly let me know: "Sorry, that question is not related to Operating System (OS). But if you have any queries about OS, feel free to ask!" so my question is -->`;
const SE = `Hello I am a MCA student. If my question pertains to SE(Software Engineering ), you'll provide me with an answer in that context. However, if it's not related to SE, you'll kindly let me know: "Sorry, that question is not related to Software Engineering (SE). But if you have any queries about SE, feel free to ask!" so my question is -->`;

const defaltText = document.createElement("h1");
defaltText.classList.add("DefaultText");
defaltText.innerHTML = ` Hello, I am Master Chat AI <br>How can I help you today?`;
chatBox.innerHTML = defaltText.outerHTML;

let aiPersona = Genral;

let genralChatArr = {
  bot: [],
  user: [],
};
let dbmsChatArr = {
  bot: [],
  user: [],
};
let osChatArr = {
  bot: [],
  user: [],
};
let coaChatArr = {
  bot: [],
  user: [],
};
let seChatArr = {
  bot: [],
  user: [],
};
localStorage.setItem("genralChatArr", JSON.stringify(genralChatArr));
localStorage.setItem("dbmsChatArr", JSON.stringify(dbmsChatArr));
localStorage.setItem("osChatArr", JSON.stringify(osChatArr));
localStorage.setItem("coaChatArr", JSON.stringify(coaChatArr));
localStorage.setItem("seChatArr", JSON.stringify(seChatArr));

// function to set items in local host
function setInLocalHost(userMsg, botMsg,chatArr) {
  genralChatArr.user.push(userMsg);
  genralChatArr.bot.push(botMsg);
  localStorage.setItem(chatArr, JSON.stringify(chatArr));
}

// Gemini ka response yaha par ayega
function GeminiResponse(msg) {
  const API_KEY = "AIzaSyDAMBuP";

  const requestData = {
    contents: [
      {
        role: "user",
        parts: [{ text: ` ${aiPersona}.${msg} .` }],
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
      if(aiPersona==Genral)
      {
        setInLocalHost(userMessage, output,genralChatArr);
      }
      
    });
}

// when we clicked on send button
sendBtn.addEventListener("click", appendResopnse);

//append response by gemini
function appendResopnse() {
  userMessage = userInput.value.trim();

  if (userMessage !== "") {
    if (chatBox.querySelector("h1")) {
      chatBox.innerHTML = "";
    }

    appendUserMessage(userMessage);
    GeminiResponse(userMessage);

    setTimeout(function () {
      appendBotMessage(output);
    }, 500);
    userInput.value = "";
  }
}

// Here we apppend user question to the chatbox div
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

// Here we append Gemini response to chatbox
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

// when we clicked on menu icon
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

// when user type questions it will added in the variable
userInput.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    appendResopnse();
  }
});

// styling of bot response
function makeBotOutput(output) {
  botDiv.innerHTML = "";
  let botDP = document.createElement("i");
  botDP.classList.add("ri-robot-2-fill");
  botDiv.appendChild(botDP);
  let botText = document.createElement("p");
  botText.innerHTML = output;
  botDiv.appendChild(botText);
}

// local got items ko print karna
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

// saveBtn.addEventListener("click", () => {
//   let usermsg = chatBox.querySelectorAll(".user-message");
//   let botmsg = chatBox.querySelectorAll(".bot-message");

//   chatBox.innerHTML = "";

//   for (let index = 0; index < usermsg.length - 1; index++) {
//     const user = usermsg[index].outerHTML;
//     const bot = botmsg[index].outerHTML;

//     // console.table(user,bot)
//     let userIndex = 0 + index;
//     let botIndex = 100 + index;
//     localStorage.setItem(`${userIndex}`, JSON.stringify(user));
//     localStorage.setItem(`${botIndex}`, JSON.stringify(bot));


//     appendUserMessage(JSON.parse(localStorage.getItem(`${userIndex})`)));
//     appendBotMessage(JSON.parse(localStorage.getItem(`${botIndex}`)));
//     makeBotOutput(JSON.parse(localStorage.getItem(`${botIndex}`)));
//   }

//   // localStorage.setItem()
// });


// manage reading mode 
let toggle = true;

readerMode.addEventListener("click",()=>{

 const leftnav = document.querySelector(".left-nav")
const inputdiv =document.querySelector(".input-div")

if(toggle){

  leftnav.style.display = 'none'
  inputdiv.style.display = 'none'
  chatBox.style.maxWidth = '100vw'
  toggle=false;
  readerMode.className="selected"
}
else{
  
  leftnav.style.display = 'flex'
  inputdiv.style.display = 'flex'
  chatBox.style.maxWidth = '70vw'
  toggle=true;
  readerMode.className="unselected"
}

const elem = document.documentElement; // Get the root element (HTML element)
if (!document.fullscreenElement) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen(); // Enter fullscreen mode
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
} else {
  if (document.exitFullscreen) {
    document.exitFullscreen(); // Exit fullscreen mode
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

})


// manage highlighter 
let myHL = false;
const highlighter = document.getElementById("highlightBtn");
const content = document.getElementById("chat-box");

function doHighlight() {
  const selection = window.getSelection();
  if (selection.toString().length > 0) {
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.classList.add("highlight");
    range.surroundContents(span);
  }
}

highlighter.addEventListener("click", function() {
  if (!myHL) {
    myHL = true;
    highlighter.classList.remove("unselected");
    highlighter.classList.add("selected");
    content.addEventListener("mouseup", doHighlight);
  } else {
    myHL = false;
    highlighter.classList.remove("selected");
    highlighter.classList.add("unselected");

    content.removeEventListener("mouseup", doHighlight);
  }
});



genralDiv.click();

