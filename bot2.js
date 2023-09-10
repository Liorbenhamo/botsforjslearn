const puppeteer = require("puppeteer");
const cheerio = require('cheerio')
const express = require("express");
const app = express();
const cors = require('cors')
let answers

app.use(express.json())
app.use(cors())

app.post("/question2", async (req, res) => {
  console.log("lior");
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1600,
      height: 700,
    },
    userDataDir:"./tmp"
  });
  let keywords=[]
  let questiontemp=req.body.question.split(" ")
  let question =questiontemp.map((item)=>item.toLowerCase())

  const page = await browser.newPage();
  await page.goto("https://www.w3schools.com/jsref/jsref_reference.asp");
  await page.waitForSelector("#searchstring");
  console.log("start loop");
  for (let index = 0; index < question.length; index++) {
    console.log(question[index]);
    //  await page.type("#searchstring", question[index]);
    //  await page.evaluate(() => document.getElementById('searchstring').value = '')
    console.log("sherch");
    if (question[index].length>3) {
        
    
    const pageData = await page.evaluate(() => {
    return {
        html:document.documentElement.innerHTML
    }})
    const $ = cheerio.load(pageData.html)
    const arrayOfStrings = $('tr td:first-child a').toArray().map((element) => {return ({name: $(element).text(),url:`https://www.w3schools.com/jsref/${$(element).attr('href')}`})});
    const filteredStrings = arrayOfStrings.filter((str) => str.name.includes(`${question[index]}`))
    console.log(question[index]);
    console.log(filteredStrings);
    keywords=[...keywords,...filteredStrings]
    console.log(keywords);
    // if (index==question.length-1){
    //     return res.status(200).json(keywords)
    // }
}


    // if(question) {
    //     console.log(question);
    //     let answers = await page.$$eval("#jsreftable", async (answers,question) => {console.log(Object.values(answers[0].firstElementChild.firstElementChild.children).filter((child)=>{console.log(child)}))},question);
    // }
    
    // console.log(answers[3]);
//     let answers2= Object.values(answers)
//     answers2?.map((item)=>{ console.log(item)}).filter((child)=>console.log(child))?.includes(question[index])
    
//     const inputValue =  page.$eval('#searchstring', el => el.value);
//      page.click('#searchstring');
// for (let i = 0; i < inputValue.length; i++) {
//    page.keyboard.press('Backspace');
//    console.log("delete");
// }
  }
  console.log("end loop");
  return res.status(200).json(keywords)
//   question.map( async (item)=> {return(`https://www.w3schools.com/jsref/${answers[0].firstElementChild.firstElementChild.firstElementChild.nextSibling.nextSibling.firstElementChild.firstElementChild.getAttribute("href")}`)
//      console.log(item);
//      await page.type("#searchstring", item);
//     console.log("sherch");
//     let answers = await page.$$eval("#jsreftable", async (answers) => {return(`https://www.w3schools.com/jsref/${answers[0].firstElementChild.firstElementChild.firstElementChild.nextSibling.nextSibling.firstElementChild.firstElementChild.getAttribute("href")}`)});
//     console.log(answers);
    // urls=[...urls,answers[0]]firstElementChild?.firstElementChild?.getAttribute("href")
//     const inputValue =  page.$eval('#searchstring', el => el.value);
//  page.click('#searchstring');
// for (let i = 0; i < inputValue.length; i++) {
//    page.keyboard.press('Backspace');
//    console.log("delete");
// }

    // console.log(urls);
//   })
 
//   await page.keyboard.press("Enter");
//   await page.waitForNavigation();
//   console.log("nono");
//   await page.waitForSelector(".gsc-webResult");
//  console.log("i am here");
//   let answers = await page.$$eval(".gsc-thumbnail-inside", async (answers) => {return(answers.map((item)=>item.firstElementChild.firstElementChild.getAttribute("href")))});
//   await page.goto(answers[0]);



//   .firstElementChild.firstElementChild.getAttribute("href")
//   await page.goto(answers1);
//   await page.waitForSelector(".s-prose");
//   let answers = await page.$$eval(".s-prose", async (answers) => {
//     return answers.map((item) => item.innerText);
//   });
//   answer1 = answers[0];
//   answer2 = answers[1];
//   answer3 = answers[2];
//   console.log(`questions from our qa:${answer1}`);
//   console.log(`answer1: ${answer2}`);
//   console.log(`answer2: ${answer3}`);
//   await browser.close();
//   return res.status(200).json({ answer1, answer2, answer3 });
});
app.listen(5000);