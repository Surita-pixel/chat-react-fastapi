export default function MessagesContainer({ children }) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            
            backgroundColor: "transparent",
            width: "100%",
            height: "70vh",
            overflowY: "scroll", // Agregar desplazamiento vertical si es necesario
          }}
        >
          <ul style={{ listStyle: "none", padding: 0 }}>
            {children}
          </ul>
        </div>
      </div>
    );
  }
  