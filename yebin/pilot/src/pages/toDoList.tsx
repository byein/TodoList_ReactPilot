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
// interface ToDoListProps {
//   // initialTaskList: Array<Task>;
//   taskList: Array<Task>;
//   className?: string;
// }
let id = 0;
enum Filter {
  all = "all",
  completed = "completed",
  ongoing = "onGoing",
}

const ToDoList: React.FC = () => {
  const [taskList, setTaskList] = useState(initialTaskList);
  const [filter, setFilter] = useState(Filter.all);

  // const [filtered, setFiltered] = useState(taskList);
  const filteredTaskList = useMemo(() => {
    let filtered;
    if (filter === Filter.ongoing) {
      filtered = taskList.filter((t) => !t.complete);
    } else if (filter === Filter.completed) {
      filtered = taskList.filter((t) => t.complete);
    } else {
      filtered = taskList;
    }
    return filtered;
  }, [filter, taskList]);

  // edit task function (if double clicked, change edit prop)
  const editTask: EditTask = (currentTask) => {
    console.log("double clicked");
    console.log(currentTask);
    const editTask = taskList.map((task) => {
      if (task === currentTask) {
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
      case Filter.completed:
        setFilter(Filter.completed);
        return;
      case Filter.ongoing:
        setFilter(Filter.ongoing);
        return;
      default:
        setFilter(Filter.all);
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
            taskList={filteredTaskList}
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
