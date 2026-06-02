import { io } from "socket.io-client";
import { useEffect, useMemo, useState } from "react";

function App() {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [Id, setId] = useState("");
  const [socketId, setSocketId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
      setSocketId(socket.id);
    });
    socket.on("welcome", (msg) => {
      console.log(msg);
    });

    socket.on("receive-message", (data) => {
      setMessages((messages) => [...messages, data]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { Id: Id, message: message });
    if (!message.trim()) return;
    setMessage("");
  };

  return (
    <div className="container">
      <div className="chatBox">
        <div className="header">
          <span>Online</span>
          <h2>{socketId}</h2>
        </div>

        <input
          type="text"
          placeholder="Enter Room Name."
          className="idFiled"
          value={Id}
          onChange={(e) => setId(e.target.value)}
        />
        <form className="chatForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit">Send</button>
        </form>
        {messages.map((m, i) => {
          return (
            <p className="class" key={i}>
              {m}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default App;
