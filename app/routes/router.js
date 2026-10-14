const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Exibe o formulário
router.get("/", (req, res) => {
    res.render("index", {
        erros: [],
        sucesso: ""
    });
});

// Recebe e valida os dados do formulário
router.post(
    "/enviar",
    [
        body("nome")
            .trim()
            .notEmpty().withMessage("Informe seu nome.")
            .isLength({ max: 100 }).withMessage("O nome deve ter até 100 caracteres."),

        body("email")
            .trim()
            .isEmail().withMessage("Informe um e-mail válido."),

        body("telefone")
            .trim()
            .notEmpty().withMessage("Informe seu telefone.")
            .isLength({ max: 25 }).withMessage("O telefone deve ter até 25 caracteres."),

        body("assunto")
            .trim()
            .notEmpty().withMessage("Informe o assunto.")
            .isLength({ max: 150 }).withMessage("O assunto deve ter até 150 caracteres."),

        body("mensagem")
            .trim()
            .notEmpty().withMessage("Escreva uma mensagem.")
            .isLength({ max: 5000 }).withMessage("A mensagem deve ter até 5000 caracteres.")
    ],
    (req, res) => {
        const resultado = validationResult(req);

        if (!resultado.isEmpty()) {
            return res.status(400).render("index", {
                erros: resultado.array(),
                sucesso: ""
            });
        }

        // Nesta versão, os dados são recebidos e validados,
        // mas não são enviados por e-mail nem armazenados.
        return res.render("index", {
            erros: [],
            sucesso: "Formulário enviado com sucesso!"
        });
    }
);

module.exports = router;
