// Definição dos personagens com seus atributos
const characters = [
    {
        name: "Mario",
        image: "../assets/mario.gif",
        speed: 4,
        handling: 3,
        power: 3
    },
    {
        name: "Luigi",
        image: "../assets/luigi.gif",
        speed: 3,
        handling: 4,
        power: 4
    },
    {
        name: "Peach",
        image: "../assets/peach.gif",
        speed: 3,
        handling: 4,
        power: 2
    },
    {
        name: "Bowser",
        image: "../assets/bowser.gif",
        speed: 5,
        handling: 2,
        power: 5
    },
    {
        name: "Yoshi",
        image: "../assets/yoshi.gif",
        speed: 2,
        handling: 4,
        power: 3
    },
    {
        name: "Donkey Kong",
        image: "../assets/dk.gif",
        speed: 2,
        handling: 2,
        power: 5
    },
    {
        name: "Toad",
        image: "../assets/toad.gif",
        speed: 3,
        handling: 5,
        power: 1
    }
];

// Estado do jogo
const gameState = {
    player1: null,
    player2: null,
    currentRound: 0,
    maxRounds: 5,
    player1Points: 0,
    player2Points: 0,
    raceStarted: false,
    raceFinished: false,
    logMessages: []
};

// Elementos DOM
const elements = {
    characterSelection: document.getElementById('character-selection'),
    raceTrack: document.getElementById('race-track'),
    raceResult: document.getElementById('race-result'),
    player1Selection: document.getElementById('player1-selection'),
    player2Selection: document.getElementById('player2-selection'),
    player1Info: document.getElementById('player1-info'),
    player2Info: document.getElementById('player2-info'),
    startRaceBtn: document.getElementById('start-race'),
    nextRoundBtn: document.getElementById('next-round'),
    restartRaceBtn: document.getElementById('restart-race'),
    newRaceBtn: document.getElementById('new-race'),
    player1Car: document.getElementById('player1-car'),
    player2Car: document.getElementById('player2-car'),
    player1Img: document.getElementById('player1-img'),
    player2Img: document.getElementById('player2-img'),
    currentRound: document.getElementById('current-round'),
    currentBlock: document.getElementById('current-block'),
    player1Name: document.getElementById('player1-name'),
    player2Name: document.getElementById('player2-name'),
    player1Points: document.getElementById('player1-points'),
    player2Points: document.getElementById('player2-points'),
    logContent: document.getElementById('log-content'),
    winnerText: document.getElementById('winner-text'),
    winnerCharacter: document.getElementById('winner-character'),
    finalPlayer1Name: document.getElementById('final-player1-name'),
    finalPlayer2Name: document.getElementById('final-player2-name'),
    finalPlayer1Points: document.getElementById('final-player1-points'),
    finalPlayer2Points: document.getElementById('final-player2-points')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeCharacterSelection();
    setupEventListeners();
});

// Inicializa a seleção de personagens
function initializeCharacterSelection() {
    // Limpa as seleções anteriores
    elements.player1Selection.innerHTML = '';
    elements.player2Selection.innerHTML = '';
    
    // Cria os cards de personagens para o jogador 1
    characters.forEach(character => {
        const card = createCharacterCard(character);
        card.addEventListener('click', () => selectCharacter(character, 1));
        elements.player1Selection.appendChild(card);
    });
    
    // Cria os cards de personagens para o jogador 2
    characters.forEach(character => {
        const card = createCharacterCard(character);
        card.addEventListener('click', () => selectCharacter(character, 2));
        elements.player2Selection.appendChild(card);
    });
    
    // Reseta o estado do jogo
    resetGameState();
}

// Cria um card de personagem
function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.dataset.name = character.name;
    
    card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h4>${character.name}</h4>
        <div class="character-stats">
            <p>Velocidade: ${character.speed}</p>
            <p>Manobrabilidade: ${character.handling}</p>
            <p>Poder: ${character.power}</p>
        </div>
    `;
    
    return card;
}

// Seleciona um personagem para um jogador
function selectCharacter(character, playerNumber) {
    // Atualiza o estado do jogo
    if (playerNumber === 1) {
        gameState.player1 = character;
        
        // Atualiza a UI
        elements.player1Info.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <div>
                <h4>${character.name}</h4>
                <p>Velocidade: ${character.speed}</p>
                <p>Manobrabilidade: ${character.handling}</p>
                <p>Poder: ${character.power}</p>
            </div>
        `;
        
        // Atualiza a seleção visual
        document.querySelectorAll('#player1-selection .character-card').forEach(card => {
            card.classList.remove('selected');
            if (card.dataset.name === character.name) {
                card.classList.add('selected');
            }
        });
    } else {
        gameState.player2 = character;
        
        // Atualiza a UI
        elements.player2Info.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <div>
                <h4>${character.name}</h4>
                <p>Velocidade: ${character.speed}</p>
                <p>Manobrabilidade: ${character.handling}</p>
                <p>Poder: ${character.power}</p>
            </div>
        `;
        
        // Atualiza a seleção visual
        document.querySelectorAll('#player2-selection .character-card').forEach(card => {
            card.classList.remove('selected');
            if (card.dataset.name === character.name) {
                card.classList.add('selected');
            }
        });
    }
    
    // Habilita o botão de iniciar corrida se ambos os jogadores estiverem selecionados
    if (gameState.player1 && gameState.player2) {
        elements.startRaceBtn.disabled = false;
    }
}

// Configura os event listeners
function setupEventListeners() {
    // Botão de iniciar corrida
    elements.startRaceBtn.addEventListener('click', startRace);
    
    // Botão de próxima rodada
    elements.nextRoundBtn.addEventListener('click', playNextRound);
    
    // Botão de reiniciar corrida
    elements.restartRaceBtn.addEventListener('click', restartRace);
    
    // Botão de nova corrida
    elements.newRaceBtn.addEventListener('click', newRace);
}

// Inicia a corrida
function startRace() {
    // Esconde a seleção de personagens e mostra a pista
    elements.characterSelection.classList.add('hidden');
    elements.raceTrack.classList.remove('hidden');
    
    // Configura os personagens na pista
    elements.player1Img.src = gameState.player1.image;
    elements.player2Img.src = gameState.player2.image;
    elements.player1Name.textContent = gameState.player1.name;
    elements.player2Name.textContent = gameState.player2.name;
    
    // Inicia a corrida
    gameState.raceStarted = true;
    gameState.currentRound = 0;
    gameState.player1Points = 0;
    gameState.player2Points = 0;
    gameState.logMessages = [];
    
    // Atualiza a UI
    updateUI();
    
    // Adiciona mensagem de início
    addLogMessage(`🏁🚨 Corrida entre ${gameState.player1.name} e ${gameState.player2.name} começando...\n`);
}

// Joga a próxima rodada
async function playNextRound() {
    if (gameState.currentRound < gameState.maxRounds) {
        gameState.currentRound++;
        elements.currentRound.textContent = gameState.currentRound;
        
        // Adiciona mensagem de rodada
        addLogMessage(`🏁 Rodada ${gameState.currentRound}`);
        
        // Sorteia o bloco da pista
        const block = await getRandomBlock();
        elements.currentBlock.textContent = getBlockName(block);
        addLogMessage(`Bloco sorteado: ${getBlockName(block)}`);
        
        // Rola os dados
        const diceResult1 = await rollDice();
        const diceResult2 = await rollDice();
        
        // Processa o resultado da rodada
        await processRound(block, diceResult1, diceResult2);
        
        // Atualiza a posição dos carros na pista
        updateCarPositions();
        
        // Verifica se a corrida acabou
        if (gameState.currentRound === gameState.maxRounds) {
            finishRace();
        }
    }
}

// Processa o resultado de uma rodada
async function processRound(block, diceResult1, diceResult2) {
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;
    
    if (block === 'RETA') {
        totalTestSkill1 = diceResult1 + gameState.player1.speed;
        totalTestSkill2 = diceResult2 + gameState.player2.speed;
        
        await logRollResult(
            gameState.player1.name,
            'velocidade',
            diceResult1,
            gameState.player1.speed
        );
        
        await logRollResult(
            gameState.player2.name,
            'velocidade',
            diceResult2,
            gameState.player2.speed
        );
    }
    
    if (block === 'CURVA') {
        totalTestSkill1 = diceResult1 + gameState.player1.handling;
        totalTestSkill2 = diceResult2 + gameState.player2.handling;
        
        await logRollResult(
            gameState.player1.name,
            'manobrabilidade',
            diceResult1,
            gameState.player1.handling
        );
        
        await logRollResult(
            gameState.player2.name,
            'manobrabilidade',
            diceResult2,
            gameState.player2.handling
        );
    }
    
    if (block === 'CONFRONTO') {
        let powerResult1 = diceResult1 + gameState.player1.power;
        let powerResult2 = diceResult2 + gameState.player2.power;
        
        addLogMessage(`${gameState.player1.name} confrontou com ${gameState.player2.name}!\n🥊`);
        
        await logRollResult(
            gameState.player1.name,
            'poder',
            diceResult1,
            gameState.player1.power
        );
        
        await logRollResult(
            gameState.player2.name,
            'poder',
            diceResult2,
            gameState.player2.power
        );
        
        if (powerResult1 > powerResult2 && gameState.player2Points > 0) {
            addLogMessage(`${gameState.player1.name} venceu o confronto! ${gameState.player2.name} perdeu 1 ponto! 🐢`);
            gameState.player2Points--;
        }
        
        if (powerResult2 > powerResult1 && gameState.player1Points > 0) {
            addLogMessage(`${gameState.player2.name} venceu o confronto! ${gameState.player1.name} perdeu 1 ponto! 🐢`);
            gameState.player1Points--;
        }
        
        if (powerResult2 === powerResult1) {
            addLogMessage("Confronto empatado! Nenhum ponto foi perdido");
        }
    }
    
    // Verifica o vencedor da rodada (apenas para blocos que não são CONFRONTO)
    if (block !== 'CONFRONTO') {
        if (totalTestSkill1 > totalTestSkill2) {
            addLogMessage(`${gameState.player1.name} marcou um ponto!`);
            gameState.player1Points++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            addLogMessage(`${gameState.player2.name} marcou um ponto!`);
            gameState.player2Points++;
        } else {
            addLogMessage("Empate! Ninguém marcou pontos.");
        }
    }
    
    addLogMessage("_____________________________________________________");
    
    // Atualiza a UI
    updateUI();
}

// Finaliza a corrida
function finishRace() {
    gameState.raceFinished = true;
    elements.nextRoundBtn.classList.add('hidden');
    elements.restartRaceBtn.classList.remove('hidden');
    
    // Adiciona mensagem de resultado final
    addLogMessage("Resultado final:");
    addLogMessage(`${gameState.player1.name}: ${gameState.player1Points} pontos`);
    addLogMessage(`${gameState.player2.name}: ${gameState.player2Points} pontos`);
    
    // Determina o vencedor
    let winnerMessage = "";
    if (gameState.player1Points > gameState.player2Points) {
        winnerMessage = `\n${gameState.player1.name} venceu a corrida! Parabéns 🏆🎉`;
        showRaceResult(gameState.player1, gameState.player1Points, gameState.player2Points);
    } else if (gameState.player2Points > gameState.player1Points) {
        winnerMessage = `\n${gameState.player2.name} venceu a corrida! Parabéns 🏆🎉`;
        showRaceResult(gameState.player2, gameState.player1Points, gameState.player2Points);
    } else {
        winnerMessage = "\nEmpate!";
        showRaceResult(null, gameState.player1Points, gameState.player2Points);
    }
    
    addLogMessage(winnerMessage);
}

// Mostra o resultado da corrida
function showRaceResult(winner, player1Points, player2Points) {
    elements.raceTrack.classList.add('hidden');
    elements.raceResult.classList.remove('hidden');
    
    elements.finalPlayer1Name.textContent = gameState.player1.name;
    elements.finalPlayer2Name.textContent = gameState.player2.name;
    elements.finalPlayer1Points.textContent = player1Points;
    elements.finalPlayer2Points.textContent = player2Points;
    
    if (winner) {
        elements.winnerText.textContent = `${winner.name} venceu!`;
        elements.winnerCharacter.innerHTML = `<img src="${winner.image}" alt="${winner.name}">`;
    } else {
        elements.winnerText.textContent = "Empate!";
        elements.winnerCharacter.innerHTML = `
            <div style="display: flex; justify-content: center; gap: 20px;">
                <img src="${gameState.player1.image}" alt="${gameState.player1.name}" style="width: 80px; height: 80px;">
                <img src="${gameState.player2.image}" alt="${gameState.player2.name}" style="width: 80px; height: 80px;">
            </div>
        `;
    }
}

// Reinicia a corrida com os mesmos personagens
function restartRace() {
    // Reseta o estado do jogo mantendo os personagens
    gameState.currentRound = 0;
    gameState.player1Points = 0;
    gameState.player2Points = 0;
    gameState.raceStarted = true;
    gameState.raceFinished = false;
    gameState.logMessages = [];
    
    // Atualiza a UI
    elements.raceResult.classList.add('hidden');
    elements.raceTrack.classList.remove('hidden');
    elements.nextRoundBtn.classList.remove('hidden');
    elements.restartRaceBtn.classList.add('hidden');
    elements.currentRound.textContent = gameState.currentRound;
    elements.currentBlock.textContent = '-';
    elements.player1Points.textContent = gameState.player1Points;
    elements.player2Points.textContent = gameState.player2Points;
    elements.logContent.innerHTML = '';
    
    // Reseta a posição dos carros
    elements.player1Car.style.left = '0';
    elements.player2Car.style.left = '0';
    
    // Adiciona mensagem de início
    addLogMessage(`🏁🚨 Corrida entre ${gameState.player1.name} e ${gameState.player2.name} começando...\n`);
}

// Inicia uma nova corrida com novos personagens
function newRace() {
    // Reseta completamente o estado do jogo
    resetGameState();
    
    // Atualiza a UI
    elements.raceResult.classList.add('hidden');
    elements.characterSelection.classList.remove('hidden');
    elements.player1Info.innerHTML = '<p>Selecione um personagem</p>';
    elements.player2Info.innerHTML = '<p>Selecione um personagem</p>';
    elements.startRaceBtn.disabled = true;
    
    // Remove as seleções visuais
    document.querySelectorAll('.character-card').forEach(card => {
        card.classList.remove('selected');
    });
}

// Reseta o estado do jogo
function resetGameState() {
    gameState.player1 = null;
    gameState.player2 = null;
    gameState.currentRound = 0;
    gameState.player1Points = 0;
    gameState.player2Points = 0;
    gameState.raceStarted = false;
    gameState.raceFinished = false;
    gameState.logMessages = [];
}

// Atualiza a UI
function updateUI() {
    elements.player1Points.textContent = gameState.player1Points;
    elements.player2Points.textContent = gameState.player2Points;
    elements.currentRound.textContent = gameState.currentRound;
}

// Atualiza a posição dos carros na pista
function updateCarPositions() {
    const trackWidth = document.querySelector('.track').offsetWidth - 80; // Subtrai o tamanho do carro
    const player1Progress = (gameState.player1Points / gameState.maxRounds) * trackWidth;
    const player2Progress = (gameState.player2Points / gameState.maxRounds) * trackWidth;
    
    elements.player1Car.style.left = `${player1Progress}px`;
    elements.player2Car.style.left = `${player2Progress}px`;
}

// Adiciona uma mensagem ao log
function addLogMessage(message) {
    gameState.logMessages.push(message);
    elements.logContent.innerHTML = gameState.logMessages.join('<br>');
    elements.logContent.scrollTop = elements.logContent.scrollHeight;
}

// Funções auxiliares que se comunicam com o back-end
async function rollDice() {
    try {
        // Versão local para desenvolvimento sem back-end
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return Math.floor(Math.random() * 6) + 1;
        }
        
        // Versão com back-end
        const response = await fetch('/api/roll-dice');
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Erro ao rolar o dado:', error);
        // Fallback para versão local em caso de erro
        return Math.floor(Math.random() * 6) + 1;
    }
}

async function getRandomBlock() {
    try {
        // Versão local para desenvolvimento sem back-end
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
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
        
        // Versão com back-end
        const response = await fetch('/api/random-block');
        const data = await response.json();
        return data.block;
    } catch (error) {
        console.error('Erro ao obter bloco aleatório:', error);
        // Fallback para versão local em caso de erro
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
}

async function logRollResult(characterName, block, diceResult, attribute) {
    addLogMessage(
        `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`
    );
}

// Retorna o nome do bloco em português
function getBlockName(block) {
    switch (block) {
        case 'RETA':
            return 'Reta';
        case 'CURVA':
            return 'Curva';
        case 'CONFRONTO':
            return 'Confronto';
        default:
            return block;
    }
}