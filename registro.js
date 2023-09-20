const fs = require('fs');
const crypto = require('crypto');

document.addEventListener('DOMContentLoaded', function () {
    const registroForm = document.getElementById('registro-form');

    registroForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('registro-nome').value;
        const senha = document.getElementById('registro-senha').value;

        const dados = {
            nome: nome,
            senha: criptografarSenha(senha)
        };

        salvarUsuario(dados);
    });

    function salvarUsuario(dados) {
        fs.writeFile('usuarios.txt', JSON.stringify(dados), (err) => {
            if (err) {
                console.error('Erro ao salvar o usuário:', err);
            } else {
                console.log('Usuário registrado com sucesso!');
            }
        });
    }

    function criptografarSenha(senha) {
        const chave = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', chave, iv);

        let senhaCriptografada = cipher.update(senha, 'utf8', 'hex');
        senhaCriptografada += cipher.final('hex');
        return {
            senhaCriptografada,
            chave: chave.toString('hex'),
            iv: iv.toString('hex')
        };
    }
});
