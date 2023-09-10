const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const cors = require('cors')
let answer1;
let answer2;
let answer3;

app.use(express.json())
app.use(cors())

app.post("/question", async (req, res) => {
  console.log("lior");
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1600,
      height: 700,
    },
  });
  console.log("kdsimd");
  const page = await browser.newPage();
  await page.goto("https://stackoverflow.com/");
  await page.waitForSelector(".s-input__search");
  await page.type(".s-input__search", `${req.body.question}`);
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  try {
    await page.waitForSelector(".recaptcha-checkbox-border", { timeout: 3000 });
    await page.click(".recaptcha-checkbox-border");
    console.log("perfect");
  } catch {
    console.log("no robot check");
  }
  let answers1 = await page.$$eval(".s-post-summary", async (answers) => {
    return `https://stackoverflow.com${answers[0]?.lastElementChild.firstElementChild.lastElementChild.getAttribute(
      "href"
    )}`;
  });
  await page.goto(answers1);
  await page.waitForSelector(".s-prose");
  let answers = await page.$$eval(".s-prose", async (answers) => {
    return answers.map((item) => item.innerText);
  });
  answer1 = answers[0];
  answer2 = answers[1];
  answer3 = answers[2];
  console.log(`questions from our qa:${answer1}`);
  console.log(`answer1: ${answer2}`);
  console.log(`answer2: ${answer3}`);
  await browser.close();
  return res.status(200).json({ answer1, answer2, answer3 });
});

// async function autoScroll(page){
//   await page.evaluate(async () => {
//       await new Promise((resolve) => {
//           var totalHeight = 0;
//           var distance = 1000;
//           var timer = setInterval(() => {
//               var scrollHeight = document.body.scrollHeight;
//               window.scrollBy(0, distance);
//               totalHeight += distance;
//               setTimeout(stop, 70000)
//               function stop(){
//                   clearInterval(timer);
//                   resolve();
//               }
//           }, 250);
//       });
//   });
// }

// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: {
//       width: 1600,
//       height: 700,
//     },

//   });
//   const page = await browser.newPage();
//   await page.goto("https://stackoverflow.com/");

//   await page.waitForSelector(".s-input__search");

//   await page.type(".s-input__search", "Shoes");
//   await page.keyboard.press('Enter')
//   await page.waitForNavigation()
//   console.log("hello");
//   try{
//   let robot = await page.waitForSelector('.recaptcha-checkbox-border', { timeout: 3000 })
// console.log(robot);
// await page.click(".recaptcha-checkbox-border")
//   console.log("perfect");
//   }catch{
//     console.log("no robot check");
//   }
//   // await page.click(".s-post-summary")

//   let answers1=await page.$$eval('.s-post-summary',async (answers) => {return(`https://stackoverflow.com${answers[0]?.lastElementChild.firstElementChild.lastElementChild.getAttribute('href')}`)})
//   //  await page.waitForSelector(".flush-left .js-search-results");
//   await page.goto(answers1);
//   console.log("here");
//   await page.waitForSelector(".s-prose");
//   console.log("there");
//   // await page.waitForNavigation()
//   console.log("ok");
//   let answers= await page.$$eval('.s-prose',async (answers) => {return(answers.map((item)=>item.innerText))})
//   console.log(answers);
//    answer1=answers[0]
// answer2=answers[1]
//  answer3=answers[2]
//  console.log(`questions from our qa:${answer1}`);
//  console.log(`answer1: ${answer2}`);
//  console.log(`answer2: ${answer3}`);
// await page.keyboard.press('Enter')https://stackoverflow.com/questions/15296737/including-shoes-in-shoes-package
// await page.screenshot({ path: "image.png" });https://stackoverflow.com/questions/15296737/including-shoes-in-shoes-package?r=SearchResults
// await autoScroll(page);
// console.log(answers[0]?.lastElementChild.firstElementChild);
// await page.waitForSelector(".product-card__link-overlay");
//   const items = await page.$$eval(' a.product-card__img-link-overlay > div > img', (items) => {
// console.log(items);
// urls=items.map((item) => item?.currentSrc)
// console.log(urls);
// names=items.map((item) => item.alt)
// console.log(names);
// });
// const prices = await page.$$eval(' .product-card__link-overlay', (prices) => {
//   console.log(prices);
//   console.log(prices.map((item) => item?.offsetParent?.lastElementChild?.lastElementChild?.lastElementChild.innerText))

//     });

// const airjordan=names.filter((item)=>item.includes("Jordan"))
// for (let x of airjordan) {
//   console.log(x);
// }
// console.log(airjordan.length);
// console.log(items.length);
// await browser.close();
// })();

app.listen(4000);
