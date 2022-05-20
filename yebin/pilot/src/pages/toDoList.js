// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import Header from "../components/header";
import "../App.css";
import PropTypes from "prop-types";
import InputBox from "../components/inputBox";
import TaskList from "../components/taskList";
import Task from "../components/task";
import data from "../data/data.json";

function ToDoList({ initialTaskList }) {
  const [taskList, setTaskList] = useState(initialTaskList);
  const [filtered, setFiltered] = useState(taskList);
  const [filter, setFilter] = useState("all");

  // toggle during filtering doesn't work well...
  useEffect(() => {
    console.log(filter);
    console.log(taskList);
    if (filter === "completed") {
      setFiltered(taskList.filter((t) => t.complete === true));
    } else if (filter === "onGoing") {
      setFiltered(taskList.filter((t) => t.complete === false));
    } else {
      setFiltered(taskList);
    }
  }, [filter, taskList]);
  // useEffect(() => {
  //   setFiltered(taskList);
  // }, [taskList]);

  // edit task function (if double clicked, change edit prop)
  const editTask = (cuurentTask) => {
    console.log("double clicked");
    console.log(cuurentTask);
    const editTask = taskList.map((task) => {
      if (task.id === cuurentTask) {
        return {
          ...task,
          edit: true,
        };
      }
      return task;
    });
    setTaskList(editTask);
  };

  // get edit task function (get the edited task title, setTaskList)
  const getEditTask = (taskId, getEditedTask) => {
    const editTask = taskList.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          title: getEditedTask,
          edit: true,
        };
      }
      return task;
    });
    setTaskList(editTask);
  };

  // save edited task function (edit is false, cannot edit while there's no double click)
  const saveEditedTask = (currentTask) => {
    const saveEditedTask = taskList.map((task) => {
      if (task.id === currentTask.id) {
        return {
          ...task,
          edit: false,
        };
      }
      return task;
    });
    setTaskList(saveEditedTask);
  };

  // toggleTask function (change the status ongoing or complete)
  const toggleTask = (selectedTask) => {
    setFiltered(taskList);
    const newTaskList = taskList.map((task) => {
      if (task === selectedTask) {
        return {
          ...task,
          complete: !task.complete,
        };
      }
      return task;
    });
    console.log(filter);
    console.log(selectedTask);

    setTaskList(newTaskList);

    if (filter === "completed") {
      setFiltered(taskList.filter((t) => t.complete));
    } else if (filter === "onGoing") {
      setFiltered(taskList.filter((t) => !t.complete));
    } else {
      setFiltered(taskList);
    }
  };

  // deleteTask function (delete task from the list)
  const deleteTask = (currentTask) => {
    console.log(currentTask);
    const removedList = taskList.filter((t) => t.id !== currentTask);
    for (let i = 0; i < removedList.length; i++) {
      removedList[i].id = i;
    }
    setTaskList(removedList);
  };

  // currentFilter function (find current filter, and set filter and filtered tasklist)
  const currentFilter = (filterTask) => {
    let activeFilter = filterTask;
    switch (activeFilter) {
      // case "all":
      //   setFiltered(taskList);
      //   setFilter("all");
      //   return;
      case "completed":
        setFiltered(taskList.filter((t) => t.complete));
        setFilter("completed");
        return;
      case "onGoing":
        setFiltered(taskList.filter((t) => !t.complete));
        setFilter("onGoing");
        return;
      default:
        setFiltered(taskList);
        setFilter("all");
        console.log("Default");
        return;
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
            setTaskList={setTaskList}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            currentFilter={currentFilter}
            filter={filter}
            editTask={editTask}
            getEditTask={getEditTask}
            saveEditedTask={saveEditedTask}
          />
        </div>
      </section>
    </div>
  );
}

ToDoList.propTypes = {
  initialTaskList: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  taskList: PropTypes.arrayOf(Task.propTypes.task),
  // setTaskList: PropTypes.func.isRequired,
  // filtered: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  // setFilteredList: PropTypes.func.isRequired,
};

export default ToDoList;
