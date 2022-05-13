import React, { useCallback } from "react";
import PropTypes from "prop-types";
import "../styles/task.css";

export default function Task({
  task: { id, title, complete },
  taskList,
  setTaskList,
  toggleTask,
  deleteTask,
}) {
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
            defaultChecked={complete === true}
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
            value={title}
            readOnly={true}
            placeholder="Input title"
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
  }),
  taskList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
    }).isRequired
  ),
};
