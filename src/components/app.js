import { useEffect, useState, useRef } from "react";

import "../assets/css/app.css";

function App() {
    let [input, setInput] = useState("");
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div className="t-container">
            <div className="t-header">
                <div className="t-header-bullet bullet-gr"></div>
                <div className="t-header-bullet bullet-or"></div>
                <div className="t-header-bullet bullet-rd"></div>
            </div>
            <div className="t-body">
                <div className="t-row">
                    <label className="t-label">visitor@john-trunix: ~ $</label>
                    <input
                        ref={inputRef}
                        className="t-input"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                // parse input
                                // execute command
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
