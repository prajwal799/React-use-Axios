import React, { useState } from "react";

function TodoInput({ onSubmit, handleUpdate, id }) {
  const [text, setTodo] = useState("");
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit && onSubmit(text);
    setTodo("");
  };

  const handleUpdates = () => {
    console.log("cxknvjk");
  };

  return (
    <div>
      <input placeholder="add something" onChange={handleChange} />
      <button onClick={handleSubmit}>Add</button>
      <button onClick={handleUpdates}>update</button>
    </div>
  );
}

export default TodoInput;
