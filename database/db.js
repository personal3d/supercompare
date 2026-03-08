const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./database/precios.db")

db.serialize(()=>{

db.run(`
CREATE TABLE IF NOT EXISTS productos(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nombre TEXT,
marca TEXT
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS precios(
id INTEGER PRIMARY KEY AUTOINCREMENT,
producto_id INTEGER,
supermercado TEXT,
precio REAL,
fecha TEXT
)
`)

})

module.exports = db