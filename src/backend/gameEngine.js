/**
 * Módulo do motor de jogo do Mario Kart Racing Simulator
 * Este módulo contém as funções principais para a lógica do jogo
 */

/**
 * Rola um dado de 6 faces
 * @returns {Promise<number>} Resultado do dado (1-6)
 */
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

/**
 * Gera um bloco aleatório para a pista
 * @returns {Promise<string>} Tipo de bloco ("RETA", "CURVA" ou "CONFRONTO")
 */
async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }

    return result;
}

/**
 * Processa uma rodada de corrida
 * @param {Object} player1 - Primeiro jogador
 * @param {Object} player2 - Segundo jogador
 * @param {string} block - Tipo de bloco
 * @param {number} diceResult1 - Resultado do dado do jogador 1
 * @param {number} diceResult2 - Resultado do dado do jogador 2
 * @returns {Object} Resultado da rodada
 */
function processRound(player1, player2, block, diceResult1, diceResult2) {
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;
    let logMessages = [];
    let player1PointsChange = 0;
    let player2PointsChange = 0;

    // Processa o bloco RETA
    if (block === "RETA") {
        totalTestSkill1 = diceResult1 + player1.speed;
        totalTestSkill2 = diceResult2 + player2.speed;

        logMessages.push(
            `${player1.name} 🎲 rolou um dado de velocidade ${diceResult1} + ${player1.speed} = ${diceResult1 + player1.speed}`
        );
        logMessages.push(
            `${player2.name} 🎲 rolou um dado de velocidade ${diceResult2} + ${player2.speed} = ${diceResult2 + player2.speed}`
        );
    }

    // Processa o bloco CURVA
    if (block === "CURVA") {
        totalTestSkill1 = diceResult1 + player1.handling;
        totalTestSkill2 = diceResult2 + player2.handling;

        logMessages.push(
            `${player1.name} 🎲 rolou um dado de manobrabilidade ${diceResult1} + ${player1.handling} = ${diceResult1 + player1.handling}`
        );
        logMessages.push(
            `${player2.name} 🎲 rolou um dado de manobrabilidade ${diceResult2} + ${player2.handling} = ${diceResult2 + player2.handling}`
        );
    }

    // Processa o bloco CONFRONTO
    if (block === "CONFRONTO") {
        let powerResult1 = diceResult1 + player1.power;
        let powerResult2 = diceResult2 + player2.power;

        logMessages.push(`${player1.name} confrontou com ${player2.name}!\n🥊`);

        logMessages.push(
            `${player1.name} 🎲 rolou um dado de poder ${diceResult1} + ${player1.power} = ${powerResult1}`
        );
        logMessages.push(
            `${player2.name} 🎲 rolou um dado de poder ${diceResult2} + ${player2.power} = ${powerResult2}`
        );

        if (powerResult1 > powerResult2) {
            if (player2.points > 0) {
                logMessages.push(`${player1.name} venceu o confronto! ${player2.name} perdeu 1 ponto! 🐢`);
                player2PointsChange = -1;
            }
        } else if (powerResult2 > powerResult1) {
            if (player1.points > 0) {
                logMessages.push(`${player2.name} venceu o confronto! ${player1.name} perdeu 1 ponto! 🐢`);
                player1PointsChange = -1;
            }
        } else {
            logMessages.push("Confronto empatado! Nenhum ponto foi perdido");
        }
    }

    // Determina o vencedor da rodada (exceto para CONFRONTO que já foi tratado)
    if (block !== "CONFRONTO") {
        if (totalTestSkill1 > totalTestSkill2) {
            logMessages.push(`${player1.name} marcou um ponto!`);
            player1PointsChange += 1;
        } else if (totalTestSkill2 > totalTestSkill1) {
            logMessages.push(`${player2.name} marcou um ponto!`);
            player2PointsChange += 1;
        } else {
            logMessages.push("Empate! Ninguém marcou pontos.");
        }
    }

    return {
        logMessages,
        player1PointsChange,
        player2PointsChange,
        totalTestSkill1,
        totalTestSkill2
    };
}

/**
 * Determina o vencedor da corrida
 * @param {Object} player1 - Primeiro jogador
 * @param {Object} player2 - Segundo jogador
 * @returns {Object} Resultado da corrida
 */
function determineWinner(player1, player2) {
    let winner = null;
    let logMessages = [];

    logMessages.push("Resultado final:");
    logMessages.push(`${player1.name}: ${player1.points} pontos`);
    logMessages.push(`${player2.name}: ${player2.points} pontos`);

    if (player1.points > player2.points) {
        winner = player1;
        logMessages.push(`\n${player1.name} venceu a corrida! Parabéns 🏆🎉`);
    } else if (player2.points > player1.points) {
        winner = player2;
        logMessages.push(`\n${player2.name} venceu a corrida! Parabéns 🏆🎉`);
    } else {
        logMessages.push("\nEmpate!");
    }

    return {
        winner,
        logMessages
    };
}

// Exporta as funções para serem usadas pelo front-end
module.exports = {
    rollDice,
    getRandomBlock,
    processRound,
    determineWinner
};