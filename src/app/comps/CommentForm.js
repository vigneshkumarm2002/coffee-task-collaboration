import { useState } from "react";
import socket from "./../../../utils/socket";

const CommentForm = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("newComment", { content: comment });
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="ml-2 p-2 border rounded bg-blue-500 text-white"
      >
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
