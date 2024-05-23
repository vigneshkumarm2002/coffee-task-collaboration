// import { NextResponse } from "next/server";

// import io from "socket.io-client";
// const socket = io("http://localhost:3000");

// export async function POST(req, res) {
//   try {
//     socket.emit("message1", "Sync Process Completed");

//     return NextResponse.json({ data: "Success" }, { status: 200 });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ error: error }, { status: 200 });
//   }
// }

// pages/api/socket.js
import { Server } from "socket.io";

export async function GET(req, res) {
  if (!res.socket.server.io) {
    console.log("Setting up Socket.IO");

    const io = new Server(res.socket.server, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("New client connected");

      io.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
