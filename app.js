const express = require('express');
const sequelize = require('./config/database');
const Cliente = require('./models/Cliente'); // Importe o modelo Cliente apenas uma vez

const app = express();

const cors = require('cors');
app.use(cors()); // Permite requisições de outros domínios

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Sincroniza o modelo com o banco de dados
sequelize.sync({ force: false }) // force: true recria as tabelas (cuidado, isso apaga dados existentes)
    .then(() => {
        console.log('Tabela clientes sincronizada com o banco de dados.');
    })
    .catch(err => {
        console.error('Erro ao sincronizar tabelas:', err);
    });

// Rota para buscar todos os clientes
app.get('/clientes', async (req, res) => {
    try {
        const clientes = await Cliente.findAll(); // Busca todos os clientes no banco de dados
        res.json(clientes); // Retorna os clientes em formato JSON
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna erro se algo der errado
    }
});

app.post('/clientes', async (req, res) => {
    console.log('Dados recebidos:', req.body); // Log para verificar os dados recebidos
    try {
        const novoCliente = await Cliente.create({
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            telefone: req.body.telefone,
            datanascimento: req.body.dataNascimento,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            cep: req.body.cep,
            datacadastro: req.body.dataCadastro || new Date().toISOString().split('T')[0],
        });
        console.log('Cliente criado:', novoCliente); // Log para verificar o cliente criado
        res.status(201).json(novoCliente);
    } catch (error) {
        console.error('Erro ao criar cliente:', error); // Log para verificar erros
        res.status(500).json({ error: error.message });
    }
});

app.put('/clientes/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id); // Busca o cliente pelo ID
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        // Atualiza os campos do cliente
        await cliente.update(req.body);
        res.json(cliente); // Retorna o cliente atualizado
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/clientes/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id); // Busca o cliente pelo ID
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        await cliente.destroy(); // Exclui o cliente
        res.status(204).send(); // Retorna status 204 (No Content)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Inicia o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});