const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async() => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto('http://www.guiadosquadrinhos.com/capas/naruto/na011100')

    await page.waitForSelector('#itenspagDll')
    await page.select('#itenspagDll', '120')

    await page.waitForNavigation()

    const content = await page.content()

    const $ = cheerio.load(content)

    console.log($('#nome_titulo_lb').text());
             
                $('#products > .Lista_album_imagem_colecao').find('li').each(function(i, elem){ 
                    console.log($(this).find(`#MainContent_lstProfileView_div_box_msg_${i} > a > span`).text())
                })
})()