/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn } = require('child_process');
const { kill } = require('cross-port-killer');

const env = Object.create(process.env);
env.BROWSER = 'none';
env.TEST = true;
env.UMI_UI = 'none';
env.PROGRESS = 'none';
// flag to prevent multiple test
let once = false;

const startServer = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'serve'], {
  env,
});

startServer.stderr.on('data', (data) => {
  // eslint-disable-next-line
});

startServer.on('exit', () => {
  kill(process.env.PORT || 8000);
});

startServer.stdout.on('data', (data) => {
  // hack code , wait umi
  if (!once && data.toString().indexOf('Serving your umi project!') >= 0) {
    // eslint-disable-next-line
    once = true;
    const testCmd = spawn(
      /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
      ['run', 'playwright'],
      {
        stdio: 'inherit',
      },
    );
    testCmd.on('exit', (code) => {
      startServer.kill();
      process.exit(code);
    });
  }
});
