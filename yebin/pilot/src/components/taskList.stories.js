// src/components/TaskList.stories.js

import React from "react";

import TaskList from "./taskList";
import * as TaskStories from "./task.stories";

export default {
  component: TaskList,
  title: "TaskList",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
};

const Template = (args) => <TaskList {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Shaping the stories through args composition.
  // The data was inherited from the Default story in task.stories.js.
  taskList: [
    { ...TaskStories.Default.args.task, id: "0", title: "Task 1" },
    { ...TaskStories.Default.args.task, id: "1", title: "Task 2" },
    { ...TaskStories.Default.args.task, id: "2", title: "Task 3" },
    { ...TaskStories.Default.args.task, id: "3", title: "Task 4" },
    { ...TaskStories.Default.args.task, id: "4", title: "Task 5" },
    {
      ...TaskStories.Default.args.task,
      id: "5",
      title: "Task 6",
      complete: true,
    },
  ],
};
