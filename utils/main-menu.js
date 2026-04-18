import inquirer from "inquirer";
import chalk from "chalk";

import { addTask } from "./add-task.js";
import { viewTasks } from "./view-tasks.js";
import { editTask } from "./edit-task.js";
import { search } from "./search.js";
import { deleteTask } from "./delete-task.js";
import { setting } from "./setting.js";

export async function mainMenu() {
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "Choose an action: ",
    choices: [
      "Add Task",
      "View All Tasks",
      "Edit Task",
      "Search",
      "Delete Task",
      "Setting",
      "Exit",
    ],
  });
  if (action === "Add Task") {
    await addTask();
  }

  if (action === "View All Tasks") {
    await viewTasks({ showTodo: true, showDoing: true, showDone: true });
  }

  if (action === "Edit Task") {
    await editTask();
  }

  if (action === "Search") {
    await search();
  }
  if (action === "Delete Task") {
    await deleteTask();
  }
  if (action === "Setting") {
    await setting();
  }

  if (action === "Exit") {
    console.log(chalk.red("Exiting..."));
    process.exit(1);
  }
}
