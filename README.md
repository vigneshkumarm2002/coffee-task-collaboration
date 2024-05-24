## Setup Instructions

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/vigneshkumarm2002/coffee-task-collaboration
    cd coffee-task-collaboration
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Start the development server**:
    Now, run the development server:
    ```bash
    npm run dev
    ```
   For socket server 
     ```bash
   node server
    ```
## Documentation

### Socket.IO Integration

Socket.IO is used for real-time communication between clients and the server. Here's how it's integrated into the project:

1. **Initialization**:
    - In the `server.js` file, Socket.IO is imported and initialized with the Express server:
      ```javascript
      const http = require('http');
      const express = require('express');
      const socketIo = require('socket.io');

      const app = express();
      const server = http.createServer(app);
      ```

2. **Handling Connections**:
    - Socket connections are handled using the `io.on('connection', ...)` event, where you can define functions to handle various socket events.

3. **Communication**:
    - Socket.IO is used for real-time updates of text editor content and comments. It facilitates collaborative editing and live comment feeds across multiple clients.

### MongoDB Integration

MongoDB is used for data storage. Here's how it's integrated into the project:

1. **Connection Setup**:
    - In the `server.js` file, a connection to MongoDB Atlas is established using the MongoDB driver:
      ```javascript
  mongoose
  .connect(
    "mongodb+srv://Vigneshkumar:6u3X6QqzhoZCkYtg@cluster0.iutdr77.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
      ```

### Socket SDK Integration

For better organization, Socket.IO connection logic can be placed in a separate file, such as `utils/socket.js`. This file can export functions to handle socket events and communication with the server.

     ```bash
 import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default socket;
    ```

### Example Usage

Here's an example of using Socket.IO to broadcast a message to all clients when a new comment is added:

```javascript
// Inside server.js
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('addComment', (comment) => {
        // Save comment to database
        // Broadcast the new comment to all clients
        socket.broadcast.emit('newComment', comment);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

