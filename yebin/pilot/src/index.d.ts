type Task = {
  id: number;
  title: string;
  complete: boolean;
  edit: boolean;
};

type ToggleTask = (selectedTask: Task) => void;

type AddTask = (newTask: string) => void;

type DeleteTask = (currentTask: Task) => void;

type EditTask = (editCurrentTask: Task) => void;

type GetEditText = (TaskId: number, getEditedTask: string) => void;

type SaveEditedTask = (saveEditedTask: Task) => void;

type CurrentFilter = (currentFilter: string) => void;
