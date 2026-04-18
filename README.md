# Task Manager CLI

A lightweight, interactive command-line task manager built with Node.js. Manage your tasks directly from the terminal with optional password protection to keep your list private.

## Features

- **Add tasks** — create tasks with a title and a status
- **View tasks** — display all tasks grouped by status with color-coded output
- **Edit tasks** — update a task's title or change its status
- **Delete tasks** — remove a single task or wipe the entire list at once
- **Search** — find tasks by title or filter by status
- **Password protection** — optionally lock the app behind a bcrypt-hashed master password
- **Local file storage** — all data is stored in plain JSON files on your machine, no network required
- **Colored output** — clear, color-coded terminal UI powered by Chalk

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher

## Installation

```bash
git clone https://github.com/Epic2077/task-manager-cli.git
cd task-manager-cli
npm install
```

## Usage

```bash
node index.js
```

On first launch you will be asked whether you want to set a master password. You can skip this step if you prefer to run without one.

### Windows shortcut

A `task-manager.bat` helper script is included. After adding the project folder to your `PATH` you can run the app from any directory with:

```bat
task-manager
```

## Main Menu

| Option | Description |
|---|---|
| Add Task | Create a new task with a title and status |
| View All Tasks | List every task grouped by Todo / Doing / Done |
| Edit Task | Rename a task or change its status |
| Search | Look up tasks by title or filter by status |
| Delete Task | Remove one task or delete all tasks at once |
| Setting | Set or remove the master password |
| Exit | Quit the application |

## Task Statuses

| Status | Color |
|---|---|
| 🟩 Todo | Green |
| 🟨 Doing | Yellow |
| 🟦 Done | Blue |

## Password Protection

When you first run the app, you can set a master password (minimum 8 characters). The password is hashed with **bcrypt** and stored in `data/manager.config.json` — your plain-text password is never saved. You can set or remove the password at any time from the **Settings** menu.

## Project Structure

```
task-manager-cli/
├── data/
│   ├── tasks.json            # Stored tasks
│   └── manager.config.json   # App config (hashed password, encryption key)
├── utils/
│   ├── add-task.js
│   ├── delete-task.js
│   ├── edit-task.js
│   ├── main-menu.js
│   ├── password.js
│   ├── search.js
│   ├── setting.js
│   └── view-tasks.js
├── index.js                  # Entry point
├── task-manager.bat          # Windows launcher script
└── package.json
```

## Dependencies

| Package | Purpose |
|---|---|
| [inquirer](https://github.com/SBoudrias/Inquirer.js) | Interactive CLI prompts |
| [chalk](https://github.com/chalk/chalk) | Terminal string styling |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing |

## License

ISC
