const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const Text = require("./models/Text");
const Comment = require("./models/Comment");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Connect to MongoDB
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

io.on("connection", (socket) => {
  console.log("New client connected");

  // Send initial data
  const sendInitialData = async () => {
    const textDoc = await Text.findOne({});
    const comments = await Comment.find({});
    const textContent = textDoc ? textDoc.content : "";
    socket.emit("initialData", { textContent, comments });
    console.log({ textContent, comments });
  };

  sendInitialData();

  // Handle text changes
  socket.on("textChange", async (newText) => {
    await Text.findOneAndUpdate({}, { content: newText }, { upsert: true });
    socket.broadcast.emit("updateText", newText);
  });

  // Handle new comment
  socket.on("newComment", async (comment) => {
    console.log(comment);
    const newComment = new Comment(comment);
    await newComment.save();
    const comments = await Comment.find({});
    io.emit("updateComments", comments);
  });

  // Handle edit comment
  socket.on("editComment", async (updatedComment) => {
    console.log("coooooo", updatedComment);
    try {
      await Comment.findByIdAndUpdate(updatedComment.id, {
        content: updatedComment.content,
      });
      const comments = await Comment.find({});
      console.log("coooooo", comments);
      io.emit("updateComments", comments);
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  });

  // Handle delete comment
  socket.on("deleteComment", async (id) => {
    try {
      await Comment.findByIdAndDelete(id);
      const comments = await Comment.find({});
      io.emit("updateComments", comments);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
