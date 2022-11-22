import { useEffect, useState, useRef } from "react";

import "../assets/css/app.css";

let dir = " $";
let historyId = 0;
let history = [];

function App() {
    let [input, setInput] = useState("");
    let [prompt_user, setPromptUser] = useState("visitor@john-trunix:");
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    function parseInput(input) {
        input = input.toLowerCase().trim();
        input = input.split(" ");

        console.log(input[0]);
        switch (input[0]) {
            case "help":
            case "-h":
                if (input.length === 1) {
                    help(input);
                } else {
                    error(input);
                }
                break;
            case "clear":
            case "-c":
                if (input.length === 1) {
                    clear(input);
                } else {
                    error(input);
                }
                break;
            case "cd":
                cd(input);
                break;
            default:
                error(input);
                break;
        }
    }

    function appendToHistory(input, prompt, value) {
        history.push({
            id: historyId,
            input: input,
            prompt: prompt,
            value: value,
        });
        historyId++;
    }

    function help(input) {
        const helpText = `
        help, -h \t\t - show this help
        clear, -c \t\t - clear the terminal
        cd \t\t\t - change directory
        `;
        appendToHistory(true, prompt_user, input);
        appendToHistory(false, prompt_user, helpText);
    }

    function error(input) {
        appendToHistory(true, prompt_user, input.join(" "));
        appendToHistory(
            false,
            prompt_user,
            "bash: " + input.join(" ") + ": command or arguments are invalid"
        );
    }

    function clear() {
        history = [];
        historyId = 0;
    }

    function cd(input) {
        console.log(input.join(" "));
    }

    function nano() {}

    return (
        <div className="t-container">
            <div className="t-header">
                <div className="t-header-bullet bullet-gr"></div>
                <div className="t-header-bullet bullet-or"></div>
                <div className="t-header-bullet bullet-rd"></div>
            </div>
            <div className="t-body">
                {history.map(({ id, input, prompt, value }) => {
                    if (input === true) {
                        return (
                            <div className="t-row" key={id}>
                                <label className="prompt">{prompt}</label>
                                <label className="t-value">{value}</label>
                            </div>
                        );
                    } else {
                        return (
                            <div className="t-row" key={id}>
                                <label className="t-value">{value}</label>
                            </div>
                        );
                    }
                })}

                <div className="t-row">
                    <label className="prompt">{prompt_user + dir}</label>
                    <input
                        ref={inputRef}
                        className="t-input"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if ((e.key === "Enter") & (input !== "")) {
                                // parse input
                                // execute command
                                parseInput(input);
                                setInput("");
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
