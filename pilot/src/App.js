import "./App.css";
import ToDoList from "./pages/toDoList";
import React, { useState } from "react";
import data from "./data/data.json";

function App() {
  // console.log(e.target.value);
  const [toDoList, setToDoList] = useState(data);

  return (
    <div>
      <ToDoList task={toDoList} />
    </div>
  );
}

export default App;
