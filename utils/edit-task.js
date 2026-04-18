import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

import { mainMenu } from "./main-menu.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TASK_PATH = path.join(__dirname, "../data/tasks.json");

export async function editTask() {
  console.clear();
  console.log(chalk.yellow("Edit Task: "));

  const { taskName } = await inquirer.prompt({
    type: "input",
    name: "taskName",
    message: "Enter Task Name to Edit: ",
  });

  const tasks = JSON.parse(fs.readFileSync(TASK_PATH, "utf8"));

  const task = tasks.entries.find(
    (e) => e.title.toLowerCase() === taskName.toLowerCase(),
  );

  if (!task) {
    console.log(
      chalk.red(
        "No task with such name was found. try again or view your tasks.",
      ),
    );
    return await mainMenu();
  }
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "select an acrion",
    choices: ["Edit title", "Edit status"],
  });

  if (action === "Edit title") {
    const { editTitle } = await inquirer.prompt({
      type: "input",
      name: "editTitle",
      message: `Enter a new title for ${task.title} title`,
    });

    task.title = editTitle;

    fs.writeFileSync(TASK_PATH, JSON.stringify(tasks, null, 2));
  }

  if (action === "Edit status") {
    const { editStatus } = await inquirer.prompt({
      type: "list",
      name: "editStatus",
      message: "select a new status",
      choices: [
        { name: "Todo", value: "Todo" },
        { name: "Doing", value: "Doing" },
        { name: "Done", value: "Done" },
      ],
    });

    task.status = editStatus;

    fs.writeFileSync(TASK_PATH, JSON.stringify(tasks, null, 2));
  }
  await mainMenu();
}
