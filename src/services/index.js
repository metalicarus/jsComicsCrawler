const cheerio = require('cheerio')
const puppeteer = require('puppeteer');

exports.extrairEdicao = (url) => {
    return (async() => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url)

        try {
            await page.waitForSelector('#itenspagDll', { timeout: 5000})
            await page.select('#itenspagDll', '120')
            await  page.waitForNavigation()
        } catch (error) {}

        const content = await page.content()
        const $ = cheerio.load(content)
        const colecao = {
            titulo: null,
            editora: null,
            genero: null,
            status: null,
            url_image: null
        }
    });
}
exports.extrairColecao = (url) => {
    return (async() => {
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()
        await page.goto(url)
        try {
            await page.waitForSelector('#itenspagDll', { timeout: 5000})
            await page.select('#itenspagDll', '120')
            await  page.waitForNavigation()
        } catch (error) {}
        let avancar = true

        let content = await page.content()
        let $ = cheerio.load(content)
        const colecao = loadColecao($)

        while(avancar){
            content = await page.content()
            $ = cheerio.load(content)
            colecao.quadrinhos_thumbs.push(...loadThumbs($))
            try { 
                if($('#MainContent_lstProfileView_dataPagerNumeric > a:nth-child(9)').text() === '>'){
                    await page.click(`#MainContent_lstProfileView_dataPagerNumeric > a:nth-child(9)`)
                    await page.waitForNavigation()
                }else{
                    await page.click(`#MainContent_lstProfileView_dataPagerNumeric > a:nth-child(7)`)
                    await page.waitForNavigation()
                }
            } catch (error) {
                avancar = false
            }
        }
        return colecao
    })()
}
const loadColecao = ($) => {
    const colecao = {
        titulo: null,
        licenciador: null,
        categoria: null,
        genero: null,
        status: null,
        quadrinhos_thumbs: []
    };
    colecao.titulo = $('#nome_titulo_lb').text()
    colecao.licenciador = $('#licenciador').text()
    colecao.categoria = $('#categoria').text()
    colecao.genero = $('#genero').text()
    colecao.status = $('#status').text()
    return colecao
}
const loadThumbs = ($) => {
    const thumbs = []
    $('#products > .Lista_album_imagem_colecao').find('li').each(function(i, elem){ 
        const quadrinho_thumb = {
            url_thumb: null,
            url_edicao: null,
            edicao: null,
            lancamento: null
        }
        quadrinho_thumb.url_thumb = $(this).find(`#MainContent_lstProfileView_div_box_msg_${i} > a.suppress > img`).attr('src')
        quadrinho_thumb.edicao = $(this).find(`#MainContent_lstProfileView_div_box_msg_${i} > a > span`).text()
        quadrinho_thumb.lancamento =  $(this).find(`#MainContent_lstProfileView_div_box_msg_${i} > a`).text()
        quadrinho_thumb.url_edicao =  $(this).find(`#MainContent_lstProfileView_div_box_msg_${i} > a`).attr('href')
        quadrinho_thumb.url_edicao = quadrinho_thumb.url_edicao.replace('../..', 'guiadosquadrinhos.com')
        thumbs.push(quadrinho_thumb)
    })
    return thumbs
}
