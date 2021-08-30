const puppeteer = require("puppeteer");
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(cors());

app.use(express.json());

app.post("/screenshot", async (req, res) => {
  //set path & id
  const ID = new Date().getTime().toString(36);
  const loc = "./public/screenshots/" + ID + ".png";

  //Start browsers
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    ignoreDefaultArgs: ["--disable-extensions"],
  });

  //Open Page
  const page = await browser.newPage();
  await page.goto(req.body.url);

  //Take a Screenshoot
  await page.screenshot({ path: loc });

  await browser.close();

  res.json({
    success: true,
    ID,
  });
});
app.listen(5000, () => {
  console.log("Server started");
});

app.on("SIGTERM", (signal) => {
  console.log(`Process ${process.pid} received a SIGTERM signal`);
  process.exit(0);
});

app.on("SIGINT", (signal) => {
  console.log(`Process ${process.pid} has been interrupted`);
  process.exit(0);
});
