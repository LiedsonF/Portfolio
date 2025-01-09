const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configura o body-parser para interpretar o corpo do JSON
app.use(bodyParser.json());

// Cria o transportador de e-mail (aqui usando Gmail como exemplo)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'liedsonfernandochapiewsky@gmail.com',
        pass: 'ovbk nwk o o jvc tgmx'
    }
});

// Rota para servir a página (caso tenha o front-end localmente)
app.use(express.static('public'));

// Rota para enviar o e-mail
app.post('/enviar-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'liedsonfernandochapiewsky@gmail.com', // E-mail de destino
        subject: `Mensagem de ${name}`,
        text: `De: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.json({ success: false, message: 'Erro ao enviar a mensagem!' });
        }
        res.json({ success: true, message: 'Mensagem enviada com sucesso!' });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});