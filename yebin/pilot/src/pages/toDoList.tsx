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
    let filtered = taskList;
    if (filter === Filter.ongoing) {
      filtered = taskList.filter((t) => !t.complete);
    } else if (filter === Filter.completed) {
      filtered = taskList.filter((t) => t.complete);
    } else {
      filtered = taskList;
    }
    return filtered;
  }, [filter, taskList]);

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
            setTaskList={setTaskList}
            currentFilter={currentFilter}
            filter={filter}
          />
        </div>
      </section>
    </div>
  );
};

export default ToDoList;
