const express = require("express");
const mongoose = require("mongoose");


const app = express();

async function startDatabase() {
    try{
        await mongoose.connect('mongodb+srv://wallissonsccp:12Qwaszx@clusterapi.moiy7.mongodb.net/dataArcnc?retryWrites=true&w=majority&appName=ClusterAPI')
        console.log("Conectado ao banco de dados")
    }catch (error){
        console.log("Erro ao conectar ao banco de dados", error)
        process.exit(1);
    }
};

startDatabase().then(() => {
    
});
app.get("/", (req, res) => {
    return res.send({mensagem: 'API ArCNC Rodando ...'})
})

app.listen(3335, () => {
    console.log("Servidor rodando na porta 3335")
})
