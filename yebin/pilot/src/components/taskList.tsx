import React, { useEffect, useState } from "react";
import { Task } from "./task";
import PropTypes from "prop-types";

import "../styles/taskList.css";
import data from "../data/data.json";

export interface TaskListProps {
  taskList: Array<Task>;
  toggleTask: ToggleTask;
  deleteTask: DeleteTask;
  editTask: EditTask;
  getEditText: GetEditText;
  saveEditedTask: SaveEditedTask;
  currentFilter: CurrentFilter;
  filter: string;
}

export const TaskList: React.FC<TaskListProps> = ({
  taskList,
  toggleTask,
  deleteTask,
  currentFilter,
  filter,
  editTask,
  getEditText,
  saveEditedTask,
}) => {
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
              {
                // show the taskList descending id(sort by recently), index reverse
                taskList
                  .slice(0)
                  .reverse()
                  .map((task, i) => {
                    return (
                      <Task
                        key={i}
                        task={task}
                        taskList={taskList}
                        // setTaskList={setTaskList}
                        // currentFilter={currentFilter}
                        // filter={filter}
                        toggleTask={toggleTask}
                        deleteTask={deleteTask}
                        editTask={editTask}
                        getEditText={getEditText}
                        saveEditedTask={saveEditedTask}
                      />
                    );
                  })
              }
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
                  htmlFor="filter"
                >
                  <input
                    type={"checkbox"}
                    id="all"
                    name="all"
                    value="all"
                    checked={filter === "all"}
                    readOnly
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
                  htmlFor="filter"
                  className={filter === "onGoing" ? "checked" : "not"}
                >
                  <input
                    type={"checkbox"}
                    id="onGoing"
                    name="onGoing"
                    value="onGoing"
                    checked={filter === "onGoing"}
                    readOnly
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
                  htmlFor="filter"
                  className={filter === "completed" ? "checked" : "not"}
                >
                  <input
                    type={"checkbox"}
                    id="completed"
                    name="completed"
                    value="completed"
                    checked={filter === "completed"}
                    readOnly
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
};

// TaskList.propTypes = {
//   taskList: PropTypes.arrayOf(Task.propTypes.task).isRequired,
//   setTaskList: PropTypes.func.isRequired,
//   toggleTask: PropTypes.func.isRequired,
//   deleteTask: PropTypes.func.isRequired,
//   currentFilter: PropTypes.func.isRequired,
//   filter: PropTypes.string.isRequired,
//   editTask: PropTypes.func.isRequired,
//   getEditTask: PropTypes.func.isRequired,
//   saveEditedTask: PropTypes.func.isRequired,
// };
