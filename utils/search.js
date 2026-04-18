import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

import { viewTasks } from "./view-tasks.js";
import { mainMenu } from "./main-menu.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TASK_PATH = path.join(__dirname, "../data/tasks.json");

export async function search() {
  console.clear();
  console.log(chalk.yellow("searching..."));

  const tasks = JSON.parse(fs.readFileSync(TASK_PATH, "utf8"));

  const { searchType } = await inquirer.prompt({
    type: "list",
    name: "searchType",
    message: "type of search?",
    choices: ["search by title", "search by status"],
  });

  if (searchType === "search by title") {
    const { taskTitle } = await inquirer.prompt({
      type: "input",
      name: "taskTitle",
      message: "Enter the task title here: ",
    });

    const task = tasks.entries.find((e) => e.title === taskTitle);

    if (!task) {
      console.log(
        chalk.red(`No task title found as ${taskTitle} in your tasks.`),
      );
      return search();
    }

    console.table(task);
    mainMenu();
  }
  if (searchType === "search by status") {
    const { taskStatus } = await inquirer.prompt({
      type: "list",
      name: "taskStatus",
      message: "select a status to search",
      choices: ["Todo", "Doing", "Done"],
    });

    if (taskStatus === "Todo") {
      return viewTasks({ showTodo: true, showDoing: false, showDone: false });
    }
    if (taskStatus === "Doing") {
      return viewTasks({ showTodo: false, showDoing: true, showDone: false });
    }
    if (taskStatus === "Done") {
      return viewTasks({ showTodo: false, showDoing: false, showDone: true });
    }
  }
}
