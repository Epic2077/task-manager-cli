import fs from "fs";
import inquirer from "inquirer";
import bcrypt from "bcryptjs";
import chalk from "chalk";

import setPassword from "./utils/password.js";
import { mainMenu } from "./utils/main-menu.js";

console.clear();
console.log(chalk.green("Welcome to Task Manager CLI!"));

const CONFIG_PATH = "./data/manager.config.json";
let config = null;

// Load or create config
function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    // create default
    const defaultConfig = { set_password: true };
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(defaultConfig, null, 2));
    return defaultConfig;
  }

  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
}

export async function init() {
  config = loadConfig();

  // STEP 1 — no master password yet
  if (!config.master && config.set_password) {
    const { security } = await inquirer.prompt({
      type: "list",
      name: "security",
      message: "You don't have a password for your task manager.",
      choices: ["Set Password", "I don't need a password"],
    });

    if (security === "Set Password") {
      console.clear();
      await setPassword();
      config = loadConfig(); // reload config because now master exists
    } else {
      config.set_password = false;
      fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
    }
  }

  // STEP 2 — password exists → require login
  if (config.master) {
    const { password: enteredPassword } = await inquirer.prompt({
      type: "password",
      name: "password",
      message: "Enter your task manager password: ",
      mask: "*",
    });

    if (!bcrypt.compareSync(enteredPassword, config.master)) {
      console.clear();
      console.error(chalk.red("Incorrect password."));
      process.exit(1);
    }
  }

  console.log(chalk.blueBright("Logged in!"));
  await mainMenu();
}

init();
