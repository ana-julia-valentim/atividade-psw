const express = require("express");
const path = require("path");
const app = express();
const porta = process.env.PORT || 3000;

// Arquivos estáticos: CSS, JavaScript e imagens
app.use(express.static(path.join(__dirname, "app/public")));

// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app/views"));

// Permite receber os dados do formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importa e utiliza as rotas
const rota = require("./app/routes/router");
app.use("/", rota);

// Inicia o servidor
app.listen(porta, () => {
    console.log(`Servidor on-line: http://localhost:${porta}`);
});
