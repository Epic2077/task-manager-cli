import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

import setPassword from "./password.js";
import { mainMenu } from "./main-menu.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.join(__dirname, "../data/manager.config.json");

export async function setting() {
  console.clear();
  console.log("Settings");

  const { settings } = await inquirer.prompt({
    type: "list",
    name: "settings",
    message: "Select a setting",
    choices: ["set Password", "remove Password"],
  });

  if (settings === "set Password") {
    return await setPassword();
  }

  if (settings === "remove Password") {
    const configs = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
    const { confirm } = await inquirer.prompt({
      type: "confirm",
      name: "confirm",
      message: "Are you sure you want to remove the manager password?",
    });
    if (!confirm) return mainMenu();

    delete configs.master;
    delete configs.encryptionKey;

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(configs, null, 2));
    console.log(chalk.green("password removed."));
  }
}
