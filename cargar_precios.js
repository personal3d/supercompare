const db = require("./database/db")

const supers = [
"Carrefour",
"Coto",
"Dia",
"ChangoMas"
]

db.all("SELECT id FROM productos",(err,rows)=>{

rows.forEach(prod=>{

supers.forEach(s=>{

let precio = Math.floor(Math.random()*2000)+500

db.run(
`INSERT INTO precios(producto_id,supermercado,precio,fecha)
VALUES(?,?,?,datetime('now'))`,
[prod.id,s,precio]
)

})

})

console.log("Precios generados")

})