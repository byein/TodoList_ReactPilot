import React, { useEffect, useState } from "react";
import Task from "./task";
import PropTypes from "prop-types";

import "../styles/taskList.css";
import data from "../data/data.json";

export default function TaskList({
  taskList,
  setTaskList,
  toggleTask,
  deleteTask,
  currentFilter,
  filter,
}) {
  const [todos, setTodos] = useState(taskList);
  const [filtered, setFiltered] = useState(taskList);

  useEffect(() => {
    setFiltered(todos);
  }, [todos]);

  return (
    <div className="TaskListWrapper">
      <table className="TaskTable">
        <thead className="TableHeader">
          <tr className="TableHeaderRow">
            <th className="TableHeaderTitle" colSpan={6}>
              오늘 할 일
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="TaskListRow">
            <td>
              {taskList.map((task, i) => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    taskList={taskList}
                    setTaskList={setTaskList}
                    toggleTask={toggleTask}
                    deleteTask={deleteTask}
                  />
                );
              })}
            </td>
          </tr>
        </tbody>

        <tfoot className="TableFooter">
          <tr className="TableFooterRow">
            <td className="TaskListCnt">총 {taskList.length}개</td>
            <td className="TableFilter TableFilterText">
              <div className="Round">
                <label
                  className={filter === "all" ? "checked" : "not"}
                  for="filter"
                >
                  <input
                    type={"checkbox"}
                    id="all"
                    name="all"
                    value="all"
                    checked={filter === "all"}
                  />
                  <span
                    onClick={() => currentFilter("all")}
                    className="CheckboxFilter"
                  />
                  전체 보기
                </label>
              </div>
            </td>
            <td className="TableFilter TableFilterText">
              <div className="Round">
                <label
                  for="filter"
                  className={filter === "onGoing" ? "checked" : "not"}
                >
                  <input
                    type={"checkbox"}
                    id="onGoing"
                    name="onGoing"
                    value="onGoing"
                    checked={filter === "onGoing"}
                  />
                  <span
                    onClick={() => currentFilter("onGoing")}
                    className="CheckboxFilter"
                  />
                  진행중인 항목만 보기
                </label>
              </div>
            </td>
            <td className="TableFilter TableFilterText">
              <div className="Round">
                <label
                  for="filter"
                  className={filter === "completed" ? "checked" : "not"}
                >
                  <input
                    type={"checkbox"}
                    id="completed"
                    name="completed"
                    value="completed"
                    checked={filter === "completed"}
                  />
                  <span
                    onClick={() => currentFilter("completed")}
                    className="CheckboxFilter"
                  />
                  완료된 항목만 보기
                </label>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

TaskList.propTypes = {
  taskList: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  setTaskList: PropTypes.func.isRequired,
};
