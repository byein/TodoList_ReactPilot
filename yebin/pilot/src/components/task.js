import React, { useState } from "react";
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

      console.log("Entered");
      console.log(e.target.value);
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
              toggleTask(taskList[id]);
            }}
          />
          <input
            checked={complete}
            className="TaskTitleText"
            type="text"
            value={editTitle}
            readOnly={!edit}
            placeholder="Input title"
            onDoubleClick={() => {
              editTask(id);
            }}
            onChange={(e) => onChangeInput(id, e.target.value)}
            onKeyPress={onKeyPress}
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