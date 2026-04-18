import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

import { mainMenu } from "./main-menu.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TASK_PATH = path.join(__dirname, "../data/tasks.json");

export async function addTask() {
  console.clear();
  console.log(chalk.green("Create a Task: "));
  const { title, status } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter a title for your task (e.g. Get ready for Interview): ",
    },
    {
      type: "list",
      name: "status",
      message: "Set status",
      choices: ["Todo", "Doing", "Done"],
    },
  ]);

  const { sure } = await inquirer.prompt({
    type: "confirm",
    name: "sure",
    message: `Do you want to set ${title} as ${status}?`,
  });

  if (!sure) {
    console.log(chalk.red("Aborting..."));
    return mainMenu();
  }

  const tasks = JSON.parse(fs.readFileSync(TASK_PATH, "utf8"));

  if (!Array.isArray(tasks.entries)) {
    tasks.entires = [];
  }

  tasks.entries.push({ title, status });
  fs.writeFileSync(TASK_PATH, JSON.stringify(tasks, null, 2));
  console.log(`${title} with status ${status} has been added.`);
  return await mainMenu();
}
