import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

import { mainMenu } from "./main-menu.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TASK_PATH = path.join(__dirname, "../data/tasks.json");
export async function deleteTask() {
  console.clear();
  console.log(chalk.green("Delete Task..."));

  const tasks = JSON.parse(fs.readFileSync(TASK_PATH, "utf8"));

  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "Choose and action: ",
    choices: ["Delete Task", "Mass Delete"],
  });

  if (action === "Delete Task") {
    const { taskTitle } = await inquirer.prompt({
      type: "input",
      name: "taskTitle",
      message: "Please enter the task title you want to delete: ",
    });
    const index = tasks.entries.findIndex((e) => e.title === taskTitle);

    if (!index) {
      console.log("Task title was not found.");
      return deleteTask();
    }

    const { confirm } = await inquirer.prompt({
      type: "confirm",
      name: "confirm",
      message: `Are you sure you want to delete "${taskTitle}"?`,
    });

    if (!confirm) {
      console.log(chalk.red("Aborting..."));
      return mainMenu();
    }

    tasks.entries.splice(index, 1);

    fs.writeFileSync(TASK_PATH, JSON.stringify(tasks, null, 2));

    console.log(chalk.green(`Deleted task " ${taskTitle} ".`));
    mainMenu();
  }
  if (action === "Mass Delete") {
    const { confirm } = await inquirer.prompt({
      type: "confirm",
      name: "confirm",
      message: "Are you sure? this will delete ALL Tasks!",
    });

    if (!confirm) {
      console.log(chalk.red("Aborting..."));
      return mainMenu();
    }

    tasks.entries = [];
    fs.writeFileSync(TASK_PATH, JSON.stringify(tasks, null, 2));

    console.log(chalk.green("All tasks deleted"));

    mainMenu();
  }
}
