const axios = require("axios")
const cheerio = require("cheerio")

async function scrap(){

let url = "https://www.carrefour.com.ar/almacen"

let html = await axios.get(url)

const $ = cheerio.load(html.data)

$(".product-item").each((i,e)=>{

let nombre = $(e).find(".product-item-name").text()

let precio = $(e).find(".price").text()

console.log(nombre,precio)

})

}

scrap()