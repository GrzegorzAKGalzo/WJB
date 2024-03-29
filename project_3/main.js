const terminal = document.getElementById("commands");
let commandHistory = [];
let commandHistoryTemp = [];
const commandInput = document.getElementById("commandInput");
const suggestionsContainer = document.getElementById("suggestions");

const BUILT_COMMANDS = {
    "clear" : "Clear terminal",
    "help" : "List of all commands",
    "quote" : "Random Quote",
    "double [number]" : "Two times is better",
    "Jon Snow" : "Does he know?"
};

const CUSTOM_COMMANDS = {
    hello: {
    msg: "Hello :)"
    },
    /* niestandardowe komendy */
}


document.getElementById("form").addEventListener('submit', function (e) {
    e.preventDefault();

    let commandInput = document.getElementById("commandInput");
    let command = commandInput.value;
    terminal.innerHTML += "<span>you: " + command + "</span>";
    if (command !== "") {
        runCommand(command);
        commandInput.value = '';
    }

});


commandInput.addEventListener('keydown', function (e) {
    let popped;
  
        switch (e.key) {
        case 'ArrowUp':
            if(commandHistory.length > 0){
                popped = commandHistory.pop();
                commandInput.value = popped;
                commandHistoryTemp.push(popped);
                console.log(commandHistoryTemp);
            }
            break;
        case 'ArrowDown':

            if(commandHistoryTemp.length > 0){
                popped = commandHistoryTemp.pop(popped);
                commandInput.value = popped;
                commandHistory.push(popped);
            }
            break;
    }
});




const runCommand = function (command) {
    commandHistory.push(command);
    console.log(commandHistory);
    command = command.toLowerCase().trim();
    
    for (const [key, value] of Object.entries(CUSTOM_COMMANDS)) {
        if(command == key){
            output(value.msg)
            return 1;
        }
    }


    if (command.startsWith("double ")) {
        doubleTerminal(command);
    } else {
        switch (command) {
            case "clear":
                clearTerminal();
                break;
            case "help":
                helpTerminal();
                break;
            case "quote":
                quoteTerminal();
                break;
            case "jon snow":
                output("You Know Nothing!");
                break;
            default:
                output('Unknown command. Type "help" for a list of commands.');
        }
    }
    clearSuggestions();
};

const doubleTerminal = function (command) {
    const numberPattern = /\d+/;
    const match = command.match(numberPattern);

    if (match) {
        const number = parseInt(match[0], 10);
        if (!isNaN(number)) {
            const result = number * 2;
            output(result);
        } else {
            output('Invalid command. Usage: double NUMBER');
        }
    } else {
        output('Invalid command. Usage: double NUMBER');
    }
};

const quoteTerminal = async function () {
    try {
        const response = await fetch("https://dummyjson.com/quotes/random");
        const data = await response.json();
        const quote = data.quote; // Assuming the API response has a 'quote' key

        // Now, you can use the 'quote' variable as needed
        output(quote);
    } catch (error) {
        console.error("Error fetching quote:", error);
    }
   
};
const helpTerminal = function () {
    let msg = "<ul>";

    for (const [key, value] of Object.entries(BUILT_COMMANDS)) {
        msg += `<li>${key} - ${value}</li>`
      }
      msg += "</ul>";
      output(msg);
};
const clearTerminal = function () {
    terminal.innerHTML = "";
};
const output = function (msg) {
    terminal.innerHTML += "<span>terminal: "+ msg +"</span>";
};




// SUGGEST
commandInput.addEventListener('input', function () {
    const inputValue = commandInput.value.toLowerCase();
    const suggestions = getCommandSuggestions(inputValue);
    displaySuggestions(suggestions);
});


function displaySuggestions(suggestions) {
    suggestionsContainer.innerHTML = '';

    suggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.textContent = suggestion;
        suggestionElement.addEventListener('click', function () {
            commandInput.value = suggestion;
            clearSuggestions();
        });
        suggestionsContainer.appendChild(suggestionElement);
    });

    if (suggestions.length > 0) {
        suggestionsContainer.style.display = 'block';
    } else {
        suggestionsContainer.style.display = 'none';
    }
}

function clearSuggestions() {
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.style.display = 'none';
}

function getCommandSuggestions(prefix) {
    prefix = prefix.toLowerCase();
    const allCommands = Object.keys(BUILT_COMMANDS).concat(Object.keys(CUSTOM_COMMANDS));
    return allCommands.filter(command => command.startsWith(prefix));
}