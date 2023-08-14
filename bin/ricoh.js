#!/usr/bin/env node
const process = require("process");
const argv = require("yargs/yargs")(process.argv.slice(2));
const chalk = require("chalk");
const { exec } = require("child_process");
const { promisify } = require("util");

const title = chalk.bold.blue;
const welcomeMessage = chalk.green;

const execPromise = promisify(exec);

const login = async () => {
  console.log(title("¡Bienvenid@s al CLI de Ricoh!"));
  console.log(
    welcomeMessage("Esperamos que disfrutes usando esta herramienta.")
  );
  const inquirer = await import("inquirer");

  const questions = [
    {
      type: "input",
      name: "username",
      message: "Ingresa tu nombre de usuario VTEX:",
    },
    {
      type: "password",
      name: "password",
      message: "Ingresa tu contraseña o pulsa enter para abrir el navegador:",
    },
  ];

  const answers = await inquirer.default.prompt(questions);

  const { username, password } = answers;

  try {
    const { stdout } = await execPromise(`vtex login ${username} ${password}`);
    console.log(`Log in successful. Output: ${stdout}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const logout = async () => {
  try {
    const { stdout } = await execPromise(`vtex logout`);
    console.log(`Log out successful. Output: ${stdout}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
  console.log(chalk.green("¡Hasta luego! Esperamos verte pronto."));
};

argv
  .strict()
  .command({
    command: "login",
    describe: "Login to the VTEX CLI",
    handler: async () => {
      await login();
    },
  })
  .command({
    command: "logout",
    describe: "Logout of the VTEX CLI",
    handler: async () => {
      await logout();
    },
  })
  .usage("Usage: $0 <command> [description]")
  .alias("h", "help")
  .epilog("copyright 2023")
  .recommendCommands()
  .help("h").argv;

