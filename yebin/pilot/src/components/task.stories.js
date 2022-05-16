// src/components/Task.stories.js

import React from "react";

import Task from "./task";

export default {
  component: Task,
  title: "Task",
};

const Template = (args) => <Task style={{ padding: "3rem" }} {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: "1",
    title: "Test Task",
    complete: false,
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    complete: true,
  },
};
