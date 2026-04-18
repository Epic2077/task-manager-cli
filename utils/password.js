import inquirer from "inquirer";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

import { init } from "../index.js";
import { mainMenu } from "./main-menu.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.join(__dirname, "../data/manager.config.json");

export default async function setPassword() {
  while (true) {
    const { password } = await inquirer.prompt({
      type: "password",
      name: "password",
      message: "Set a password:",
      mask: "*",
    });

    if (password.length < 8) {
      console.error("Password too short (minimum 8 chars).");
      continue;
    }

    const { confirm } = await inquirer.prompt({
      type: "password",
      name: "confirm",
      message: "Confirm password:",
      mask: "*",
    });

    if (password !== confirm) {
      console.error("Passwords do not match.");
      continue;
    }

    const { sure } = await inquirer.prompt({
      type: "confirm",
      name: "sure",
      message: "Are you sure?",
    });

    if (!sure) {
      console.log("Aborting...");
      return init();
    }

    // Save
    const hashed = bcrypt.hashSync(password, 10);
    const encryptionKey = crypto.randomBytes(32).toString("hex");

    fs.writeFileSync(
      CONFIG_PATH,
      JSON.stringify(
        { master: hashed, encryptionKey, set_password: false },
        null,
        2,
      ),
    );

    console.log("Password set.");
    await mainMenu();
  }
}
