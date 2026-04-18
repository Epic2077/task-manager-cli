import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

import { mainMenu } from "./main-menu.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TASK_PATH = path.join(__dirname, "../data/tasks.json");

export async function viewTasks({ showTodo, showDoing, showDone }) {
  console.clear();
  console.log("Viewing all tasks...");

  const tasks = JSON.parse(fs.readFileSync(TASK_PATH, "utf8"));
  if (!Array.isArray(tasks.entries) || tasks.entries.length === 0) {
    console.log("No Tasks saved yet");
    return await mainMenu();
  }

  const todo = tasks.entries.filter((e) => e.status === "Todo");
  const doing = tasks.entries.filter((e) => e.status === "Doing");
  const done = tasks.entries.filter((e) => e.status === "Done");

  if (showTodo === true) {
    console.log("=== Todo ===");
    if (todo.length === 0) {
      console.log(chalk.green("🟩 No todo tasks."));
    } else {
      todo.forEach((i, index) =>
        console.log(chalk.green(`🟩 [${index}] ${i.title}`)),
      );
    }
  }

  console.log("");

  if (showDoing === true) {
    console.log("=== Doing ===");
    if (doing.length === 0) {
      console.log(chalk.yellow("🟨 No doing tasks."));
    } else {
      doing.forEach((i, index) =>
        console.log(chalk.yellow(`🟨 [${index}] ${i.title}`)),
      );
    }
  }

  console.log("");

  if (showDone === true) {
    console.log("=== Done ===");
    if (done.length === 0) {
      console.log(chalk.blue("🟦 No done tasks."));
    } else {
      done.forEach((i, index) =>
        console.log(chalk.blue(`🟦 [${index}] ${i.title}`)),
      );
    }
  }

  console.log("");
  return await mainMenu();
}
