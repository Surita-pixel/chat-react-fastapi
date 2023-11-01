from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import json

app = FastAPI()

# Permitir solicitudes desde todos los orígenes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Lista para almacenar las conexiones WebSocket activas
active_connections = []

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    # Aceptar la conexión WebSocket
    await websocket.accept()

    # Agregar la conexión a la lista
    active_connections.append(websocket)

    try:
        while True:
            # Esperar un nuevo mensaje en formato JSON
            data = await websocket.receive_text()
            message_object = {"usuario": websocket.client.host, "mensaje": data, "hora": get_current_time()}
            print(message_object)

            # Enviar el mensaje a todas las conexiones activas
            for connection in active_connections:
                await connection.send_text(json.dumps(message_object))
    except Exception as e:
        print(f"Error: {str(e)}")
    finally:
        # En caso de desconexión, eliminar la conexión de la lista
        active_connections.remove(websocket)

def get_current_time():
    return datetime.now().strftime("%H:%M:%S")
