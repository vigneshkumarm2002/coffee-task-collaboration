// components/CommentList.js
import React, { useEffect, useState } from "react";
import socket from "../../../utils/socket";

const CommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    socket.on("initialData", (data) => {
      setComments(data.comments);
    });

    socket.on("updateComments", (newComments) => {
      setComments(newComments);
    });

    return () => {
      socket.off("initialData");
      socket.off("updateComments");
    };
  }, []);

  const handleEdit = (id) => {
    console.log(id);
    const newContent = prompt("Edit your comment:");
    if (newContent) {
      socket.emit("editComment", { id, content: newContent });
    }
  };

  const handleDelete = (id) => {
    socket.emit("deleteComment", id);
  };

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="p-2 border rounded">
          <p>{comment.content}</p>
          <button
            onClick={() => handleEdit(comment._id)}
            className="mr-2 text-blue-500"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(comment._id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
