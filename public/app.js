async function buscar(){

let q=document.getElementById("buscar").value

let res=await fetch("/api/buscar?q="+q)

let data=await res.json()

let tabla=""

let min=Math.min(...data.map(x=>x.precio))

data.forEach(p=>{

tabla+=`
<tr style="${p.precio==min?'background:#d4ffd4':''}">

<td>${p.nombre}</td>
<td>${p.marca}</td>
<td>${p.supermercado}</td>
<td>$${p.precio}</td>

</tr>
`

})

document.getElementById("tabla").innerHTML=tabla

}

async function stats(){

let res=await fetch("/api/stats")

let data=await res.json()

let html=""

data.forEach(s=>{

html+=`<li>${s.supermercado}: ${s.baratos} productos más baratos</li>`

})

document.getElementById("stats").innerHTML=html

}