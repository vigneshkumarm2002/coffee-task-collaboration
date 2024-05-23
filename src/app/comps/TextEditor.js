// components/TextEditor.js
import React, { useEffect, useState } from "react";
import socket from "../../../utils/socket";

const TextEditor = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("initialData", (data) => {
      setText(data.textContent);
    });

    socket.on("updateText", (newText) => {
      setText(newText);
    });

    return () => {
      socket.off("initialData");
      socket.off("updateText");
    };
  }, []);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    socket.emit("textChange", newText);
  };

  return (
    <textarea
      value={text}
      onChange={handleChange}
      className="border border-gray-300 w-full h-[300px] p-4"
    />
  );
};

export default TextEditor;
