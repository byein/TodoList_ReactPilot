// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import Header from "../components/header";
import "../App.css";
import PropTypes from "prop-types";
import InputBox from "../components/inputBox";
import { TaskList } from "../components/taskList";
import { Task } from "../components/task";
import data from "../data/data.json";

const initialTaskList: Array<Task> = data;
// interface ToDoListProps {
//   // initialTaskList: Array<Task>;
//   taskList: Array<Task>;
//   className?: string;
// }
let id = 0;
const ToDoList: React.FC = () => {
  const [taskList, setTaskList] = useState(initialTaskList);
  const [filtered, setFiltered] = useState(taskList);
  const [filter, setFilter] = useState("all");

  // toggle during filtering doesn't work well...
  useEffect(() => {
    console.log(filter);
    console.log(taskList);
    if (filter === "completed") {
      const completedTaskList = taskList.filter((t) => t.complete === true);
      setFiltered(completedTaskList);
    } else if (filter === "onGoing") {
      const onGoingTaskList = taskList.filter((t) => t.complete === false);
      setFiltered(onGoingTaskList);
    } else {
      setFiltered(taskList);
    }
  }, [filter, taskList]);
  // useEffect(() => {
  //   setFiltered(taskList);
  // }, [taskList]);

  // edit task function (if double clicked, change edit prop)
  const editTask: EditTask = (cuurentTask) => {
    console.log("double clicked");
    console.log(cuurentTask);
    const editTask = taskList.map((task) => {
      if (task === cuurentTask) {
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
  const getEditText: GetEditText = (taskId, getEditedTask) => {
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
  const saveEditedTask: SaveEditedTask = (currentTask) => {
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
  const toggleTask: ToggleTask = (selectedTaskId) => {
    // setFiltered(taskList);
    const newTaskList = taskList.map((task) => {
      if (task === selectedTaskId) {
        return {
          ...task,
          complete: !task.complete,
        };
      }
      return task;
    });
    console.log(filter);
    console.log(selectedTaskId);

    setTaskList(newTaskList);
  };

  // deleteTask function (delete task from the list)
  const deleteTask: DeleteTask = (currentTask) => {
    console.log(currentTask);
    const removedList = taskList.filter((t) => t !== currentTask);
    for (let i = 0; i <= removedList.length - 1; i++) {
      removedList[i].id = i;
    }
    setTaskList(removedList);
  };

  // currentFilter function (find current filter, and set filter and filtered tasklist)
  const currentFilter: CurrentFilter = (filterTask) => {
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
            // className="TaskListComponentWrapper"
            taskList={filtered}
            // setTaskList={setTaskList}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            currentFilter={currentFilter}
            filter={filter}
            editTask={editTask}
            getEditText={getEditText}
            saveEditedTask={saveEditedTask}
          />
        </div>
      </section>
    </div>
  );
};

// ToDoList.propTypes = {
//   initialTaskList: PropTypes.arrayOf(Task.propTypes.task).isRequired,
//   taskList: PropTypes.arrayOf(Task.propTypes.task),
//   // setTaskList: PropTypes.func.isRequired,
//   // filtered: PropTypes.arrayOf(Task.propTypes.task).isRequired,
//   // setFilteredList: PropTypes.func.isRequired,
// };

export default ToDoList;
