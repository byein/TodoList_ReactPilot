import React, { useState, useRef, useEffect, createRef } from "react";
import PropTypes from "prop-types";
import "../styles/task.css";

export interface TaskProps {
  task: {
    id: number;
    title: string;
    complete: boolean;
    edit: boolean;
  };
  taskList: Array<Task>;
  toggleTask: ToggleTask;
  deleteTask: DeleteTask;
  editTask: EditTask;
  getEditText: GetEditText;
  saveEditedTask: SaveEditedTask;
}

export const Task: React.FC<TaskProps> = ({
  task,
  toggleTask,
  deleteTask,
  editTask,
  getEditText,
  saveEditedTask,
}) =>
  // task: Task,
  // taskList: Array<Task>,
  // setTaskList: Function,
  // toggleTask: ToggleTask,
  // deleteTask: DeleteTask,
  // editTask: EditTask,
  // getEditTask: GetEditText,
  // saveEditedTask: SaveEditedTask
  {
    const [editTitle, setEditTitle] = useState(task.title);
    // onChange function for update input value
    const onChangeInput = (id: number, getEditedTask: string) => {
      setEditTitle(getEditedTask);
      getEditText(id, getEditedTask);
    };
    // if enter key is pressed, save edited task
    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const target = e.target as HTMLInputElement;
        getEditText(task.id, target.value);
        // saveEditedTask(target.value);
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
          // editTask(id);
          break;
        default:
          target.blur();

          return;
      }
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
              onChange={() => toggleTask(task)}
              onClick={() => toggleTask(task)}
              name="checked"
              // id={task.id}
            />
            <span
              className="CheckboxCustom"
              onClick={() => {
                toggleTask(task);
              }}
            />
            <input
              checked={task.complete}
              className="TaskTitleText"
              type="text"
              value={task.title}
              readOnly={!task.edit}
              placeholder="Input title"
              onDoubleClick={() => {
                editTask(task);
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
            onClick={() => deleteTask(task)}
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
