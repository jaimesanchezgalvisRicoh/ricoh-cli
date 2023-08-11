#!/usr/bin/env node
const yargs = require("yargs");
const chalk = require("chalk");
const { exec } = require("child_process");
const { promisify } = require("util")

const title = chalk.bold.blue;
const welcomeMessage = chalk.green;

const execPromise = promisify(exec); 

const login = async () => {
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

console.log(title("¡Bienvenid@s al CLI de Ricoh!"));
console.log(welcomeMessage("Esperamos que disfrutes usando esta herramienta."));

yargs.command({
  command: "login",
  describe: "Log in to the VTEX CLI",
  handler: async () => {
    await login();
  },
});

yargs.help().argv;

yargs.parse();