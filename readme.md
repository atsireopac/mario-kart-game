# Simulador de Corridas do Mario Kart

<div align="center">
  <img src="./src/frontend/assets/header.gif" alt="Mario Kart" width="300">
  <p><strong>Um simulador de corridas do Mario Kart com interface web interativa</strong></p>
</div>

## 📋 Sobre o Projeto

Este projeto é um simulador de corridas do Mario Kart que permite aos usuários escolherem personagens com diferentes atributos e competirem em uma corrida virtual. O jogo simula uma corrida de 5 rodadas, onde cada rodada apresenta diferentes desafios (retas, curvas ou confrontos) que testam os atributos específicos de cada personagem.

### Arquitetura do Projeto

O projeto segue uma arquitetura separada em front-end e back-end:

- **Front-end**: Interface do usuário desenvolvida com HTML, CSS e JavaScript puro.
- **Back-end**: API RESTful desenvolvida com Node.js e Express que fornece a lógica do jogo.

## 🎮 Funcionalidades

- **Seleção de Personagens**: Escolha entre 7 personagens clássicos do Mario Kart, cada um com atributos únicos.
- **Interface Gráfica**: Visualize a corrida em uma interface web amigável e interativa.
- **Simulação de Corrida**: Acompanhe o progresso da corrida rodada por rodada.
- **Log Detalhado**: Veja todos os eventos da corrida em tempo real.
- **Resultado Final**: Visualize o vencedor e a pontuação final de forma clara.

## 🏎️ Personagens Disponíveis

<table align="center">
  <tr>
    <td align="center">
      <img src="./src/frontend/assets/mario.gif" alt="Mario" width="60" height="60"><br>
      <strong>Mario</strong><br>
      Velocidade: 4<br>
      Manobrabilidade: 3<br>
      Poder: 3
    </td>
    <td align="center">
      <img src="./src/frontend/assets/luigi.gif" alt="Luigi" width="60" height="60"><br>
      <strong>Luigi</strong><br>
      Velocidade: 3<br>
      Manobrabilidade: 4<br>
      Poder: 4
    </td>
    <td align="center">
      <img src="./src/frontend/assets/peach.gif" alt="Peach" width="60" height="60"><br>
      <strong>Peach</strong><br>
      Velocidade: 3<br>
      Manobrabilidade: 4<br>
      Poder: 2
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="./src/frontend/assets/bowser.gif" alt="Bowser" width="60" height="60"><br>
      <strong>Bowser</strong><br>
      Velocidade: 5<br>
      Manobrabilidade: 2<br>
      Poder: 5
    </td>
    <td align="center">
      <img src="./src/frontend/assets/yoshi.gif" alt="Yoshi" width="60" height="60"><br>
      <strong>Yoshi</strong><br>
      Velocidade: 2<br>
      Manobrabilidade: 4<br>
      Poder: 3
    </td>
    <td align="center">
      <img src="./src/frontend/assets/dk.gif" alt="Donkey Kong" width="60" height="60"><br>
      <strong>Donkey Kong</strong><br>
      Velocidade: 2<br>
      Manobrabilidade: 2<br>
      Poder: 5
    </td>
  </tr>
  <tr>
    <td align="center" colspan="3">
      <img src="./src/frontend/assets/toad.gif" alt="Toad" width="60" height="60"><br>
      <strong>Toad</strong><br>
      Velocidade: 3<br>
      Manobrabilidade: 5<br>
      Poder: 1
    </td>
  </tr>
</table>

## 🕹️ Regras do Jogo

1. **Corrida de 5 Rodadas**: Os personagens competem em uma corrida de 5 rodadas.
2. **Blocos da Pista**: A cada rodada, é sorteado um bloco da pista que pode ser:
   - **Reta**: Teste de velocidade (dado + atributo de velocidade)
   - **Curva**: Teste de manobrabilidade (dado + atributo de manobrabilidade)
   - **Confronto**: Teste de poder (dado + atributo de poder)
3. **Pontuação**:
   - Vencer em retas e curvas: +1 ponto
   - Perder em confrontos: -1 ponto (nunca abaixo de 0)
4. **Vitória**: Ao final, vence quem acumulou mais pontos.

## 🚀 Como Executar

### Pré-requisitos

- Node.js instalado

### Instalação

1. Clone o repositório ou baixe os arquivos
2. Navegue até a pasta do projeto
3. Instale as dependências:

```bash
npm install
```

### Executando o Projeto

#### Modo Completo (Back-end + Front-end)

```bash
npm start
```

Este comando inicia o servidor back-end que serve a aplicação front-end.
Acesse a aplicação em: http://localhost:3000

#### Modo Desenvolvimento

Para executar o front-end e back-end simultaneamente em modo de desenvolvimento:

```bash
npm run dev
```

Para executar apenas o front-end:

```bash
npm run dev:frontend
```

Para executar apenas o back-end:

```bash
npm run dev:backend
```

## 🛠️ Tecnologias Utilizadas

### Front-end
- HTML5
- CSS3
- JavaScript

### Back-end
- Node.js
- Express.js
- API RESTful

### Ferramentas de Desenvolvimento
- Nodemon
- Concurrently
- HTTP-Server

## 📝 Licença

Este projeto está sob a licença ISC.

---

<div align="center">
  <p>Desenvolvido com ❤️</p>
</div>
