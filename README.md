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

1. **Installation**:
    - Socket.IO is installed as a dependency using npm:
      ```bash
      npm install socket.io
      ```

2. **Initialization**:
    - In the `server.js` file, Socket.IO is imported and initialized with the Express server:
      ```javascript
      const http = require('http');
      const express = require('express');
      const socketIo = require('socket.io');

      const app = express();
      const server = http.createServer(app);
      const io = socketIo(server);
      ```

3. **Handling Connections**:
    - Socket connections are handled using the `io.on('connection', ...)` event, where you can define functions to handle various socket events.

4. **Communication**:
    - Socket.IO is used for real-time updates of text editor content and comments. It facilitates collaborative editing and live comment feeds across multiple clients.

### MongoDB Integration

MongoDB is used for data storage. Here's how it's integrated into the project:

1. **Connection Setup**:
    - In the `server.js` file, a connection to MongoDB Atlas is established using the MongoDB driver:
      ```javascript
      const { MongoClient } = require('mongodb');

      const uri = 'your_mongodb_connection_string';
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

      async function connectToDatabase() {
          try {
              await client.connect();
              console.log('Connected to MongoDB Atlas');
              // Use client to perform database operations
          } catch (error) {
              console.error('Error connecting to MongoDB Atlas:', error);
          }
      }

      connectToDatabase();
      ```

2. **Database Operations**:
    - The `client` object is used to perform database operations such as inserting, updating, and querying data.

### Socket SDK Integration

For better organization, Socket.IO connection logic can be placed in a separate file, such as `utils/socket.js`. This file can export functions to handle socket events and communication with the server.

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

