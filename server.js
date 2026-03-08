const express = require("express")
const cors = require("cors")
const path = require("path")

const db = require("./database/db")

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static("public"))

/* agregar producto */

app.post("/api/producto",(req,res)=>{

const {nombre,marca}=req.body

db.run(
"INSERT INTO productos(nombre,marca) VALUES(?,?)",
[nombre,marca],
function(err){

if(err) return res.status(500).json(err)

res.json({id:this.lastID})

})

})

/* agregar precio */

app.post("/api/precio",(req,res)=>{

const {producto_id,supermercado,precio}=req.body

db.run(
`INSERT INTO precios(producto_id,supermercado,precio,fecha)
VALUES(?,?,?,datetime('now'))`,
[producto_id,supermercado,precio],
(err)=>{

if(err) return res.status(500).json(err)

res.json({ok:true})

})

})

/* buscar producto */

app.get("/api/buscar",(req,res)=>{

const q=req.query.q || ""

db.all(
`SELECT p.nombre,p.marca,pr.supermercado,pr.precio
FROM productos p
JOIN precios pr ON p.id=pr.producto_id
WHERE p.nombre LIKE ?`,
["%"+q+"%"],
(err,rows)=>{

if(err) return res.status(500).json(err)

res.json(rows)

})

})

/* carrito mas barato */

app.post("/api/carrito",(req,res)=>{

const {productos}=req.body

let resultado={}

productos.forEach(prod=>{

db.all(
`SELECT supermercado,precio
FROM precios
WHERE producto_id=?`,
[prod],
(err,rows)=>{

if(rows){

let min=rows.reduce((a,b)=>a.precio<b.precio?a:b)

resultado[prod]=min

}

})

})

setTimeout(()=>res.json(resultado),200)

})

/* estadisticas */

app.get("/api/stats",(req,res)=>{

db.all(
`
SELECT supermercado,COUNT(*) as baratos
FROM (
SELECT producto_id,supermercado,precio,
MIN(precio) OVER(PARTITION BY producto_id) as minp
FROM precios
)
WHERE precio=minp
GROUP BY supermercado
`,
(err,rows)=>{

res.json(rows)

})

})

app.listen(3000,()=>{

console.log("Servidor iniciado en http://localhost:3000")

})