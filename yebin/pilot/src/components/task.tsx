import React, { useState, useRef, useEffect, createRef } from "react";
import PropTypes from "prop-types";
import "../styles/task.css";

export interface TaskProps {
  task: {
    id: number;
    title: string;
    complete: boolean;
  };
  taskList: Array<Task>;
  setTaskList: Function;
}

export const Task: React.FC<TaskProps> = ({ task, taskList, setTaskList }) => {
  const [edit, setEdit] = useState(false);

  // onChange function for update input value
  const onChangeInput = (id: number, getEditedTask: string) => {
    getEditText(id, getEditedTask);
  };

  // if enter key is pressed, save edited task
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      getEditText(task.id, target.value);
      target.blur();

      console.log("Entered");
      console.log(target.value);
    }
  };

  // handleClick function(when update, manage the focus on double click not on single click)
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    switch (e.detail) {
      case 1:
        console.log("click");
        e.preventDefault();
        e.stopPropagation();
        break;
      case 2:
        console.log("double click");

        editTask(task.id);
        // editTask(id);
        break;
      default:
        target.blur();

        return;
    }
  };

  // edit task function (if double clicked, change edit prop)
  const editTask: EditTask = (currentTaskId) => {
    console.log("double clicked");
    console.log(currentTaskId);
    console.log(edit);
    const editTask = taskList.map((task) => {
      if (task.id === currentTaskId) {
        setEdit(true);
        return {
          ...task,
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
        setEdit(true);
        return {
          ...task,
          title: getEditedTask,
        };
      }
      return task;
    });
    setTaskList(editTask);
  };

  // toggleTask function (change the status ongoing or complete)
  const toggleTask: ToggleTask = (selectedTaskId) => {
    const newTaskList = taskList.map((task) => {
      if (task.id === selectedTaskId) {
        return {
          ...task,
          complete: !task.complete,
        };
      }
      return task;
    });
    console.log(selectedTaskId);

    setTaskList(newTaskList);
  };

  // deleteTask function (delete task from the list)
  const deleteTask: DeleteTask = (currentTaskId) => {
    console.log(currentTaskId);
    const removedList = taskList.filter((task) => task.id !== currentTaskId);
    setTaskList(removedList);
  };

  return (
    <div className="ListItemWrapper">
      <div className={`ListItem ${task.complete}`}>
        <label
          className={task.complete ? "complete" : undefined}
          htmlFor={`item-${task.id}`}
        >
          <input
            type="checkbox"
            checked={task.complete}
            onChange={() => toggleTask(task.id)}
            onClick={() => toggleTask(task.id)}
            name="checked"
            // id={task.id}
          />
          <span
            className="CheckboxCustom"
            onClick={() => {
              toggleTask(task.id);
            }}
          />
          <input
            checked={task.complete}
            className="TaskTitleText"
            type="text"
            value={task.title}
            readOnly={!edit}
            placeholder="Input title"
            onDoubleClick={() => {
              editTask(task.id);
            }}
            onChange={(e) => onChangeInput(task.id, e.target.value)}
            onKeyPress={onKeyPress}
            onClick={handleClick}
            onMouseDown={handleClick}
            // onKeyDown={onKeyPress}
          />
        </label>

        <button
          className="TaskDeleteBtn"
          type="button"
          onClick={() => deleteTask(task.id)}
        >
          <img
            src="/assets/trash_icon.png"
            alt="remove"
            className="TaskDeleteBtnIcon"
          />
        </button>
      </div>
    </div>
  );
};

// Task.propTypes = {
//   task: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     complete: PropTypes.bool,
//     edit: PropTypes.bool,
//   }),
//   taskList: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       title: PropTypes.string.isRequired,
//       complete: PropTypes.bool,
//       edit: PropTypes.bool,
//     }).isRequired
//   ),
// };
