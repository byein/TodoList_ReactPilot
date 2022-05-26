// import logo from './logo.svg';
import React, { useEffect, useState, useMemo } from "react";
import Header from "../components/header";
import "../App.css";
import PropTypes from "prop-types";
import InputBox from "../components/inputBox";
import { TaskList } from "../components/taskList";
import { Task } from "../components/task";
import data from "../data/data.json";

const initialTaskList: Array<Task> = data;

const ToDoList: React.FC = () => {
  const [taskList, setTaskList] = useState(initialTaskList);
  return (
    <div>
      <Header />
      <section className="BodySection">
        <InputBox taskList={taskList} setTaskList={setTaskList} />
        <div className="TaskListSection">
          <TaskList
            // className="TaskListComponentWrapper"
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
      </section>
    </div>
  );
};

export default ToDoList;
