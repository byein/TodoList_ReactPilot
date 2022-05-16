import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../styles/inputBox.css";

let id = 0;
const InputBox = ({ taskList, setTaskList }) => {
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setTitle(e.target.value);
  };

  const cancelAddTask = () => {
    setTitle("");
  };

  const onClickAddBtn = (e) => {
    e.preventDefault();
    id = taskList.length;
    const nextTaskList = {
      id: id++,
      title: title,
      state: "TASK_INBOX",
      complete: false,
    };

    if (title.length === 0) {
      return;
    } else {
      setTaskList([...taskList, nextTaskList]);
      inputRef.current.focus();
    }
    console.log(title);
    console.log(taskList);
    setTitle("");
  };
  useEffect(() => {
    console.log(taskList);
  }, [taskList]);
  return (
    <div className="InputBoxTotalWrapperDiv">
      <form className="InputBoxTotalWrapperForm">
        <label>
          <div className="InputBoxWrapper">
            <input
              className="InputBox"
              type={"text"}
              name="task"
              value={title}
              ref={inputRef}
              placeholder="오늘 할 일을 적어주세요"
              onChange={onChangeInput}
            />
            <img
              src="/assets/input_remove_icon.png"
              alt="x"
              className="InputRemoveIcon"
              onClick={cancelAddTask}
            />
          </div>
        </label>
        <button type="button" className="InputBoxBtn" onClick={onClickAddBtn}>
          <img src="/assets/add_icon.png" alt="+" className="AddIcon" />
          <div className="InputBoxBtnText">추가하기</div>
        </button>
      </form>
    </div>
  );
};

// props 값 검증
InputBox.propTypes = {
  taskList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
    }).isRequired
  ),
  setTaskList: PropTypes.func.isRequired,
};

export default InputBox;
