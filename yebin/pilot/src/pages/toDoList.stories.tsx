import React from "react";
import "../App.css";
import ToDoList from "./toDoList";
import * as TaskStories from "../components/task.stories";
import * as TaskListStories from "../components/taskList.stories";
import data from "../data/data.json";
import withMock from "storybook-addon-mock";
import { Meta, Story } from "@storybook/react";

export default {
  component: ToDoList,
  title: "ToDoList",
  decorators: [withMock],
} as Meta;

const Template = () => (
  <section className="TaskListSection">
    <ToDoList />
  </section>
);

export const Default = Template.bind({});
// Default.args = {
//   initialTaskList: data,
//   //         [
//   //     { ...TaskStories.Default.args.task, id: "0", title: "Task 1" },
//   //     { ...TaskStories.Default.args.task, id: "1", title: "Task 2" },
//   //     { ...TaskStories.Default.args.task, id: "2", title: "Task 3" },
//   //     { ...TaskStories.Default.args.task, id: "3", title: "Task 4" },
//   //     { ...TaskStories.Default.args.task, id: "4", title: "Task 5" },
//   //     {
//   //       ...TaskStories.Default.args.task,
//   //       id: "5",
//   //       title: "Task 6",
//   //       complete: true,
//   //     },
//   //   ],
// };
