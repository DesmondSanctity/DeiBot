import pkg from "@slack/bolt";
import dotenv from "dotenv";

dotenv.config();
const { App } = pkg;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});

// console.log(app);

app.message(":wave:", async ({ message, say }) => {
  if (message) {
    console.log(`Received message: ${message.text}`);
    await say(`Hello, <@${message.user}>`);
  }
});

(async () => {
  try {
    await app.start(process.env.PORT || 3000);
    console.log("⚡️ Bolt app is running!");
  } catch (error) {
    console.error("Error starting Bolt app:", error);
  }
})();
