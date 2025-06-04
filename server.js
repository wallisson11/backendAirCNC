require('dotenv').config(); 
const express = require("express");
const cors = require('cors');
const path = require('path');
const mongoose = require("mongoose");

const routes = require('./routes');

const app = express();
// Habilita o parser de JSON em todas as rotas
app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>{
    return res.send('API AirCNC Rodando ...')
})

//Rota de teste rápida
app.get('/ping', (req, res) => {
  console.log('🔔 recebeu ping');
  res.send('pong');
});

// Registra as rotas da aplicação
// - a partir deste ponto, qualquer requisição irá passar pelo seu router (routes.js)
// Por que o app.use(routes) aqui?
// Deve vir após o express.json(), para que o body já seja convertido em objeto JavaScript.
// Registra todas as sub-rotas definidas em routes.js.
app.use(routes)
app.use('/files', express.static(path.resolve(__dirname, 'uploads')));


async function startDatabase(){
   
    const { DB_USER, DB_PASS, DB_NAME } = process.env;

    const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.gvrzawi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
    // mongodb+srv://wallissonsccp:<db_password>@cluster0.gvrzawi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

    try {
        await mongoose.connect(uri);
        console.log('Conectado ao MongoDBAtlas')
    } catch (error) {
        console.error(' Erro ao conectar ao MongoDB: ', error.message);
        process.exit(1); // Encerra o processo se a conexão falhar
    }
}

startDatabase().then( () => {
    
    const port = process.env.PORT || 3335
    const server = app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`)
    })

})

