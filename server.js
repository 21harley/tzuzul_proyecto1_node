///server 
const express = require('express');
const path = require("path");
//const favicon = require('serve-favicon');
//const template = path.join(__dirname,'template/')

//Importando las rutas:
/*
const userRoutes = require("./routes/users")
*/
function template(document){
    return path.join(__dirname,"template",document)
}

const app = express()

// Procesos intermedios
// Middleware
//Convirtiendo el body de la petición
app.use(express.text()) // Cada vez que se haga uso de la app, se ejecute express.text()
app.use(express.json()) // Cada vez que se haga uso de la app, se ejecute express.json()
app.use(express.urlencoded({extended:true})) // Cada vez que se haga uso de la app, se ejecute express.urlencoded()
app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon(__dirname + '/public/noteboot.ico'));

//Utilizando las rutas
//app.use(userRoutes)

app.get('/',function(peticion,respuesta){
    return respuesta.sendFile(template("index.html"))
})


app.listen(5000,function(){
    console.log("Funcionando... http://localhost:5000")
})