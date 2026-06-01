import { io } from "socket.io-client";
import { useEffect, useMemo, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [socketId,setSocketId] = useState("");
  const socket = useMemo(() => io("http://localhost:3000"), []);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    socket.on("welcome", (msg) => {
      console.log(msg);
    });
    socket.on("receive-message", (data) => {
      console.log(data)
    });
    return () => {
      socket.disconnect();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    if (!message.trim()) return;
    setMessage("");
  };

  return (
    <div className="container">
      <div className="chatBox">
        <div className="header">
          <h2>Live Chat</h2>
          <span>Online</span>
        </div>

        <div className="messages">
          <div className="message received">Hello, how can I help you?</div>

          <div className="message sent">I need some information.</div>
        </div>

        <form className="chatForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
