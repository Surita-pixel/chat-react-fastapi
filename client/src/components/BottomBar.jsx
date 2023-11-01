/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/buttonBarStyle.css"

export default function BottonBar({ ws }) {
  const [messageText, setMessageText] = useState("");
  const [usuario, setUsuario] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    // Validar que tanto el mensaje como el usuario no estén vacíos antes de enviar el mensaje.
    if (!messageText.trim() || !usuario.trim()) {
      alert("Tanto el mensaje como el usuario son campos obligatorios.");
      return;
    }

    const messageObject = {
      usuario: usuario,
      mensaje: messageText,
      hora: new Date().toLocaleTimeString(),
    };

    ws.send(JSON.stringify(messageObject));
    setMessageText("");
  };

  return (
    <div
      style={{
        
        color:"#242424",
        background: "#ffff",
        display: "flex",
        alignItems: "center", // Centra verticalmente
        width: "100%",
        height: "6vh",
        padding: "0 10px", // Agrega un espacio alrededor del formulario
      }}
      className="bottom-bar"
    >
        
      <form onSubmit={sendMessage} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <p>mensaje: </p>
        <input
          type="text"
          id="messageText"
          autoComplete="off"
          value={messageText}
          placeholder="Mensaje"
          onChange={(e) => setMessageText(e.target.value)}
        />
        <input
          placeholder="Usuario"
          type="text"
          id="user"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <button 
        style={{
            backgroundColor:"transparent",
            color:"black"
        }}
        type="submit">Send</button>
      </form>
    </div>
  );
}
