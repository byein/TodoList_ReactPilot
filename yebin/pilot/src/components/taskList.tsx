import React, { useEffect, useState, useMemo } from "react";
import { Task } from "./task";
import PropTypes from "prop-types";

import "../styles/taskList.css";

export interface TaskListProps {
  taskList: Array<Task>;
  setTaskList: Function;
}

enum Filter {
  all = "all",
  completed = "completed",
  ongoing = "onGoing",
}

export const TaskList: React.FC<TaskListProps> = ({
  taskList,
  setTaskList,
}) => {
  const [filter, setFilter] = useState(Filter.all);

  // const [filtered, setFiltered] = useState(taskList);
  const filteredTaskList = useMemo(() => {
    let filtered = taskList;
    if (filter === Filter.ongoing) {
      filtered = taskList.filter((t) => !t.complete);
    } else if (filter === Filter.completed) {
      filtered = taskList.filter((t) => t.complete);
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
                filteredTaskList
                  .slice(0)
                  .reverse()
                  .map((task) => {
                    return (
                      <Task
                        key={task.id}
                        task={task}
                        taskList={taskList}
                        setTaskList={setTaskList}
                      />
                    );
                  })
              }
            </td>
          </tr>
        </tbody>

        <tfoot className="TableFooter">
          <tr className="TableFooterRow">
            <td className="TaskListCnt">총 {filteredTaskList.length}개</td>
            <td className="TableFilter TableFilterText">
              <div className="Round">
                <label
                  className={filter === Filter.all ? "checked" : "not"}
                  htmlFor="filter"
                >
                  <input
                    type={"checkbox"}
                    id={Filter.all}
                    name={Filter.all}
                    value={Filter.all}
                    checked={filter === Filter.all}
                    readOnly
                  />
                  <span
                    onClick={() => currentFilter(Filter.all)}
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
                  className={filter === Filter.ongoing ? "checked" : "not"}
                >
                  <input
                    type={"checkbox"}
                    id={Filter.ongoing}
                    name={Filter.ongoing}
                    value={Filter.ongoing}
                    checked={filter === Filter.ongoing}
                    readOnly
                  />
                  <span
                    onClick={() => currentFilter(Filter.ongoing)}
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
                  className={filter === Filter.completed ? "checked" : "not"}
                >
                  <input
                    type={"checkbox"}
                    id={Filter.completed}
                    name={Filter.completed}
                    value={Filter.completed}
                    checked={filter === Filter.completed}
                    readOnly
                  />
                  <span
                    onClick={() => currentFilter(Filter.completed)}
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
