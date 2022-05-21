import React, { useState, useRef, useEffect, createRef } from "react";
import PropTypes from "prop-types";
import "../styles/task.css";

export default function Task({
  task: { id, title, complete, edit },
  taskList,
  setTaskList,
  toggleTask,
  deleteTask,
  editTask,
  getEditTask,
  saveEditedTask,
}) {
  const [editTitle, setEditTitle] = useState(title);

  // onChange function for update input value
  const onChangeInput = (id, getEditedTask) => {
    setEditTitle(getEditedTask);
    getEditTask(id, getEditedTask);
  };

  // if enter key is pressed, save edited task
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      saveEditedTask(e.target.value);
      e.target.blur();

      console.log("Entered");
      console.log(e.target.value);
    }
  };

  // handleClick function(when update, manage the focus on double click not on single click)
  const handleClick = (e) => {
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
        e.target.blur();

        return;
    }
  };

  return (
    <div className="ListItemWrapper">
      <div className={`ListItem ${complete}`}>
        <label
          className={complete ? "complete" : undefined}
          htmlFor={`item-${id}`}
        >
          <input
            type="checkbox"
            checked={complete}
            onChange={() => toggleTask(taskList[id])}
            onClick={() => toggleTask(taskList[id])}
            name="checked"
            id={id}
          />
          <span
            className="CheckboxCustom"
            onClick={() => {
              toggleTask(id);
            }}
          />
          <input
            checked={complete}
            className="TaskTitleText"
            type="text"
            value={title}
            readOnly={!edit}
            placeholder="Input title"
            onDoubleClick={() => {
              editTask(id);
            }}
            onChange={(e) => onChangeInput(id, e.target.value)}
            onKeyPress={onKeyPress}
            onClick={handleClick}
            onMouseDown={handleClick}
            // onKeyDown={onKeyPress}
          />
        </label>

        <button
          className="TaskDeleteBtn"
          type="button"
          onClick={() => deleteTask(id)}
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
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool,
    edit: PropTypes.bool,
  }),
  taskList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      complete: PropTypes.bool,
      edit: PropTypes.bool,
    }).isRequired
  ),
};
