/**
 * Servidor para o Simulador de Corridas do Mario Kart
 * Este servidor fornece uma API para o front-end se comunicar com o motor do jogo
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const gameEngine = require('./gameEngine');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do front-end
app.use(express.static(path.join(__dirname, '../frontend')));

// Rotas da API

/**
 * Rota para rolar um dado
 */
app.get('/api/roll-dice', async (req, res) => {
    try {
        const result = await gameEngine.rollDice();
        res.json({ result });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao rolar o dado' });
    }
});

/**
 * Rota para obter um bloco aleatório
 */
app.get('/api/random-block', async (req, res) => {
    try {
        const block = await gameEngine.getRandomBlock();
        res.json({ block });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter bloco aleatório' });
    }
});

/**
 * Rota para processar uma rodada
 */
app.post('/api/process-round', (req, res) => {
    try {
        const { player1, player2, block, diceResult1, diceResult2 } = req.body;
        
        if (!player1 || !player2 || !block || !diceResult1 || !diceResult2) {
            return res.status(400).json({ error: 'Parâmetros inválidos' });
        }
        
        const result = gameEngine.processRound(player1, player2, block, diceResult1, diceResult2);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar rodada' });
    }
});

/**
 * Rota para determinar o vencedor
 */
app.post('/api/determine-winner', (req, res) => {
    try {
        const { player1, player2 } = req.body;
        
        if (!player1 || !player2) {
            return res.status(400).json({ error: 'Parâmetros inválidos' });
        }
        
        const result = gameEngine.determineWinner(player1, player2);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao determinar vencedor' });
    }
});

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});