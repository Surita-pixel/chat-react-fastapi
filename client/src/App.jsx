import { useState, useEffect } from "react";
import "./App.css";

import GloboDeTexto from "./components/GloboMensajes";
import BottonBar from "./components/BottomBar";
import MessagesContainer from "./components/MessagesContainer";

function App() {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newWs = new WebSocket("ws://127.0.0.1:8000/ws");

    newWs.onmessage = function (event) {
      setMessages((prevMessages) => [...prevMessages, JSON.parse(event.data)]);
    };

    setWs(newWs);

    return () => {
      newWs.close();
    };
  }, []);

  return (
    <>
      <header>
        <h1>WebSocket Chat</h1>
      </header>

      <MessagesContainer>
        {messages.map((message, index) => {
          let usuario = JSON.parse(message.mensaje).usuario ?? "";
          let mensaje = JSON.parse(message.mensaje).mensaje;
          return (
            <li key={index}>
              <GloboDeTexto
                username={usuario}
                message={mensaje}
                hour={message.hora.split(":").slice(0, 2).join(":")}
              />
            </li>
          );
        })}
      </MessagesContainer>

      <BottonBar ws={ws} />
    </>
  );
}

export default App;
