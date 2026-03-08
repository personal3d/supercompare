const db = require("./database/db")

const productos = [

["Leche","La Serenisima"],
["Leche","Ilolay"],
["Arroz","Gallo"],
["Arroz","Lucchetti"],
["Fideos","Matarazzo"],
["Fideos","Lucchetti"],
["Aceite","Natura"],
["Aceite","Cocinero"],
["Azucar","Ledesma"],
["Yerba","Taragui"],
["Yerba","Playadito"],
["Yerba","Rosamonte"]

]

productos.forEach(p=>{

db.run(
"INSERT INTO productos(nombre,marca) VALUES(?,?)",
[p[0],p[1]]
)

})

console.log("Productos cargados")