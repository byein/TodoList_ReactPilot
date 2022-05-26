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
  // let edit: boolean = false;
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

        editTask(task);
        // editTask(id);
        break;
      default:
        target.blur();

        return;
    }
  };

  // edit task function (if double clicked, change edit prop)
  const editTask: EditTask = (currentTask) => {
    console.log("double clicked");
    console.log(currentTask);
    const editTask = taskList.map((task) => {
      if (task === currentTask) {
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

  // save edited task function (edit is false, cannot edit while there's no double click)
  const saveEditedTask: SaveEditedTask = (currentTask) => {
    const saveEditedTask = taskList.map((task) => {
      if (task.id === currentTask.id) {
        setEdit(false);
        return {
          ...task,
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
            readOnly={!edit}
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
