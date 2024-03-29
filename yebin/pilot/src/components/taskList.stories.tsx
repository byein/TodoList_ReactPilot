// src/components/TaskList.stories.js

import React from "react";
import { Meta, Story } from "@storybook/react";

import { TaskList, TaskListProps } from "./taskList";
import * as TaskStories from "./task.stories";

export default {
  component: TaskList,
  title: "TaskList",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
} as Meta;

const Template: Story<TaskListProps> = (args) => <TaskList {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Shaping the stories through args composition.
  // The data was inherited from the Default story in task.stories.js.
  taskList: [
    {
      id: 1,
      title: "Task 1",
      complete: false,
    },
    {
      id: 2,
      title: "Task 2",
      complete: true,
    },
    {
      id: 3,
      title: "Task 3",
      complete: false,
    },
    {
      id: 4,
      title: "Task 4",
      complete: true,
    },
    {
      id: 5,
      title: "Task 5",
      complete: true,
    },
    {
      id: 6,
      title: "Task 6",
      complete: true,
    },
  ],
};
