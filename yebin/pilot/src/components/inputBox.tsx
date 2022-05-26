import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import "../styles/inputBox.css";

let id = 0;
interface InputBoxProps {
  taskList: Array<Task>;
  setTaskList: Function;
}
const InputBox: React.FC<InputBoxProps> = ({ taskList, setTaskList }) => {
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  // onChange function for input
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // cancel add task (mark x)
  const cancelAddTask = () => {
    setTitle("");
  };

  // Add task
  // onClick function for add button
  const onClickAddBtn = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    id = taskList[taskList.length - 1].id;
    const nextTaskList = {
      id: ++id,
      title: title,
      state: "TASK_INBOX",
      complete: false,
    };

    // if there is no new task, don't add task
    if (title.length === 0) {
      return;
    } else {
      setTaskList([...taskList, nextTaskList]);
      // inputRef.current.focus();
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
// InputBox.propTypes = {
//   taskList: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       title: PropTypes.string.isRequired,
//       complete: PropTypes.bool,
//       edit: PropTypes.bool,
//     }).isRequired
//   ),
//   setTaskList: PropTypes.func.isRequired,
// };

export default InputBox;
