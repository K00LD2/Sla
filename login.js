const fs = require('fs');
const crypto = require('crypto');

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('login-nome').value;
        const senha = document.getElementById('login-senha').value;

        fs.readFile('usuarios.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo:', err);
            } else {
                const usuario = JSON.parse(data);
                const senhaDescriptografada = descriptografarSenha(usuario.senha.senhaCriptografada, usuario.senha.chave, usuario.senha.iv);

                if (usuario.nome === nome && senha === senhaDescriptografada) {
                    console.log('Login bem-sucedido!');
                } else {
                    console.log('Nome de usuário ou senha incorretos.');
                }
            }
        });
    });

    function descriptografarSenha(senhaCriptografada, chave, iv) {
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(chave, 'hex'), Buffer.from(iv, 'hex'));
        let senhaDescriptografada = decipher.update(senhaCriptografada, 'hex', 'utf8');
        senhaDescriptografada += decipher.final('utf8');
        return senhaDescriptografada;} });
