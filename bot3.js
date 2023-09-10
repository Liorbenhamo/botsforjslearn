const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(cors())

app.post("/question", async (req, res) => {
    const browser = await puppeteer.launch({
        headless:false,
        defaultViewport:false,
        userDataDir:"./tmp"
    });
    const page = await browser.newPage();
  let items=[]
  let title
    let img
    let price
  let loopstop=true
  let isdisabled
    await page.goto('https://www.amazon.com/s?k=work+from+home+fitness&language=he&pd_rd_r=dcac9453-9d3b-441b-80e9-2310f4809f96&pd_rd_w=5EOqZ&pd_rd_wg=NrFvT&pf_rd_p=fe3ccbe0-eb92-4cdf-8b3d-c96fbfeddbe3&pf_rd_r=KXRET4N1MMW7DKBMW6PZ&qid=1688368168&ref=sr_pg_1');
  await page.screenshot({path:'imgoflior.png'})
  while (loopstop) {
    await page.waitForSelector('.rush-component.s-latency-cf-section')
  const fatherofproducts=await page.$$('.rush-component.s-latency-cf-section')
  
    for (const product of fatherofproducts) {
    await page.waitForSelector('.rush-component.s-latency-cf-section')
    try{
        await page.waitForSelector('div > div > div > div > div > div.a-section.a-spacing-small.puis-padding-left-small.puis-padding-right-small > div.a-section.a-spacing-none.a-spacing-top-small.s-title-instructions-style > h2')
     title= await page.evaluate(el=>el.querySelector('div > div > div > div > div > div.a-section.a-spacing-small.puis-padding-left-small.puis-padding-right-small > div.a-section.a-spacing-none.a-spacing-top-small.s-title-instructions-style > h2')?.textContent,product)
    console.log(title);
    }catch(error){
console.log(error);
    }
    try{
        await page.waitForSelector('span > a > div > img')
   img= await page.evaluate(el=>el.querySelector('span > a > div > img')?.getAttribute("src"),product)
  console.log(img);
}catch(error){
    console.log(error);
        }
        try{
            await page.waitForSelector('span.a-price-whole')
 price= await page.evaluate(el=>el.querySelector(' span.a-price-whole')?.firstChild?.textContent,product)
  console.log(price);
}catch(error){
    console.log(error);
        }
  if (title) {
    items=[...items,{title:title,img:img,price:price}]
    console.log(items.length,"hi");
  }

  }
  await page.waitForSelector('div > div > span > a.s-pagination-next')
  
   isdisabled=await page.$('.s-pagination-next.s-pagination-disabled')!==null
  
  if (!isdisabled) {
    await page.click("div > div > span > a.s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator",)
  }else{
    console.log("loop end");
    loopstop=false
}
}
  
  
    await browser.close();

});


app.listen(6000);