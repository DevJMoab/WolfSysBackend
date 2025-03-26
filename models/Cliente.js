const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100)
    },
    telefone: {
        type: DataTypes.STRING(15)
    },
    datanascimento: {
        type: DataTypes.DATEONLY,
        validate: {
            isDate: {
                msg: "Data de nascimento inválida"
            }
        }
    },
    logradouro: {
        type: DataTypes.STRING(255)
    },
    numero: {
        type: DataTypes.STRING(10)
    },
    complemento: {
        type: DataTypes.STRING(255)
    },
    bairro: {
        type: DataTypes.STRING(255)
    },
    cidade: {
        type: DataTypes.STRING(100)
    },
    estado: {
        type: DataTypes.CHAR(2)
    },
    cep: {
        type: DataTypes.CHAR(8)
    },
    datacadastro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'clientes', // Nome da tabela no banco de dados (tudo em minúsculas)
    timestamps: false // Desativa colunas createdAt e updatedAt
});

module.exports = Cliente;