// src/components/Task.stories.js

import React from "react";
import { Meta, Story } from "@storybook/react";
import { Task, TaskProps } from "./task";

export default {
  component: Task,
  title: "Task",
} as Meta;

const Template: Story<TaskProps> = (args) => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: 1,
    title: "Test Task",
    complete: false,
    edit: false,
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    id: 1,
    title: "Test Task",
    edit: false,
    complete: true,
  },
};
