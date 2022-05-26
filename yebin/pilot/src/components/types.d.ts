type Task = {
  id: number;
  title: string;
  complete: boolean;
  // edit: boolean;
};

type ToggleTask = (selectedTask: number) => void;

type AddTask = (newTask: string) => void;

type DeleteTask = (currentTask: number) => void;

type EditTask = (editCurrentTask: number) => void;

type GetEditText = (TaskId: number, getEditedTask: string) => void;

type SaveEditedTask = (saveEditedTask: number) => void;

type CurrentFilter = (currentFilter: string) => void;

type onChangeInput = (id: number, getEditedTask: string) => void;
