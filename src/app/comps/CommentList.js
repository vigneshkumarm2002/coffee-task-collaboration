// components/CommentList.js
import React, { useEffect, useState } from "react";
import socket from "../../../utils/socket";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const CommentList = () => {
  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState("");
  const [isEditID, setIsEditID] = useState(null);

  const handleSubmit = (e) => {
    console.log("com", comment);
    e.preventDefault();
    if (isEditID) {
      console.log("hello");
      socket.emit("editComment", { id: isEditID, content: comment });
      setIsEditID(null);
    } else {
      socket.emit("newComment", { content: comment });
    }

    setComment("");
  };

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

  const handleEdit = (data) => {
    setIsEditID(data?._id);
    setComment(data?.content);
  };

  const handleDelete = (id) => {
    socket.emit("deleteComment", id);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 rounded w-full "
        />
        <button
          type="submit"
          className="ml-2 p-2 whitespace-nowrap border rounded bg-blue-500 text-white"
        >
          {isEditID ? "Edit Comment" : "Add Comment"}
        </button>
      </form>

      {comments.map((comment) => (
        <div
          key={comment.id}
          className="p-2 border rounded flex justify-between"
        >
          <p>{comment.content}</p>
          <div>
            <button
              onClick={() => handleEdit(comment)}
              className="mr-2 text-blue-500"
            >
              <PencilSquareIcon className="w-5 h-5 text-black" />
            </button>
            <button
              onClick={() => handleDelete(comment._id)}
              className="text-red-500"
            >
              <TrashIcon className="w-5 h-5  text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
