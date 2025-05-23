import detect from "detect-port";
import { exec } from "child_process";

const DEFAULT_PORT = 3000;

async function startReact() {
  try {
    const port = await detect(DEFAULT_PORT);

    if (port === DEFAULT_PORT) {
      console.log(`Starting React app on default port ${DEFAULT_PORT}...`);
      exec("react-scripts start", (err, stdout, stderr) => {
        if (err) {
          console.error(`Error starting React app:`, err);
          return;
        }
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
      });
    } else {
      console.log(
        `Port ${DEFAULT_PORT} is busy, starting React on port ${port}...`
      );
      const isWin = process.platform === "win32";
      const command = isWin
        ? `set PORT=${port} && react-scripts start`
        : `PORT=${port} react-scripts start`;

      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error starting React app on port ${port}:`, err);
          return;
        }
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
      });
    }
  } catch (error) {
    console.error("Failed to detect port:", error);
  }
}

startReact();
