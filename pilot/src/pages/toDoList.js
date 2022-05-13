// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import Header from "../components/header";
import "../App.css";
import PropTypes from "prop-types";
import InputBox from "../components/inputBox";
import TaskList from "../components/taskList";
import Task from "../components/task";
import data from "../data/data.json";

// const initailTaskList = [];

function ToDoList({ initialTaskList }) {
  const [filter, setFilter] = useState("all");
  const [taskList, setTaskList] = useState(initialTaskList);
  const [filtered, setFiltered] = useState(taskList);
  useEffect(() => {
    setFiltered(taskList);
  }, [taskList]);

  const toggleTask = (selectedTask) => {
    const newTaskList = taskList.map((task) => {
      if (task === selectedTask) {
        return {
          ...task,
          complete: !task.complete,
        };
      }
      return task;
    });
    setTaskList(newTaskList);
  };
  const deleteTask = (currentTask) => {
    const removedList = taskList.filter((t) => t.id !== currentTask);
    for (let i = 0; i < removedList.length; i++) {
      removedList[i].id = i;
    }
    setTaskList(removedList);
  };

  const currentFilter = (filterTask) => {
    let activeFilter = filterTask;
    switch (activeFilter) {
      case "all":
        setFiltered(taskList);
        setFilter("all");
        return;
      case "completed":
        setFiltered(taskList.filter((t) => t.complete));
        setFilter("completed");
        return;
      case "onGoing":
        setFiltered(taskList.filter((t) => !t.complete));
        setFilter("onGoing");
        return;
      default:
        setFilter("all");
        console.log("Default");
    }
  };
  return (
    <div>
      <Header />
      <section className="BodySection">
        <InputBox taskList={taskList} setTaskList={setTaskList} />
        <div className="TaskListSection">
          <TaskList
            className="TaskListComponentWrapper"
            taskList={filtered}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            currentFilter={currentFilter}
            filter={filter}
          />
        </div>
      </section>
    </div>
  );
}

ToDoList.propTypes = {
  taskList: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  setTaskList: PropTypes.func.isRequired,
  filtered: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  setFilteredList: PropTypes.func.isRequired,
};

export default ToDoList;
