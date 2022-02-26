const express = require('express')
const path = require("path")
//const views = path.join(__dirname,'views/')

//Importando las rutas:
const userRoutes = require("./routes/users")
const cardRoutes = require("./routes/card")

function views(document){
    return path.join(__dirname,"views",document)
}

const app = express()


//Utilizando template engines
app.set("view engine",'pug')
app.set("views","views")


// Procesos intermedios
// Middleware
//Definieno carpeta de arhivos estáticos
//app.use(express.static(path.join(__dirname,"public")))
app.use("/public", express.static('./public/'));
//app.use(express.static(__dirname + '/public'));
//Convirtiendo el body de la petición
app.use(express.text()) // Cada vez que se haga uso de la app, se ejecute express.text()
app.use(express.json()) // Cada vez que se haga uso de la app, se ejecute express.json()
app.use(express.urlencoded({extended:true})) // Cada vez que se haga uso de la app, se ejecute express.urlencoded()


//Utilizando las rutas
app.use(userRoutes)
app.use(cardRoutes)

app.get('/',function(peticion,respuesta){
    return respuesta.render("index")
})

app.use(function(peticion,respuesta) {
    respuesta.status(404).render("NotFound");
});

app.listen(5000,function(){
    console.log("Funcionando... http://localhost:5000")
})