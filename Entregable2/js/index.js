"use strict";
import {Game} from './Game.js';
import {Board} from './Board.js';
import {ChipGame} from './ChipGame.js';

document.addEventListener('DOMContentLoaded', () => {

    let btnStart = document.getElementById('save');
    btnStart.addEventListener('click', startNewGame);

    let minuteTimer = document.getElementById('minute-timer');
    let secondTimer = document.getElementById('second-timer');
    let seconds = 300

    // Se crea intervalo de tiempo nulo
    let interval = window.setInterval(null, null);
    let btnRestart = document.getElementById('restart');
    btnRestart.addEventListener('click', startNewGame);

    let imgPlayerOne = new Image();
    let imgPlayerTwo = new Image();

    imgPlayerOne.src = './img/redChip.png';
    imgPlayerTwo.src = './img/blackChip.png';

    function startNewGame(){

        // Se limpia el intervalo de tiempo antes de comenzar un nuevo juego
        interval = window.clearInterval(interval);
        seconds = 301;
        interval = window.setInterval(updateSeconds, 1000);

        // Comienza jugando el jugador 1
        let isPlayerOnePlaying = true
        let colorOne = document.querySelector('#one-color').value;
        let colorTwo = document.querySelector('#two-color').value;

        // El modo de juego es la cantidad de fichas en linea que se deben ubicar para ganar
        let mode = parseInt(document.querySelector('input[name="inLine"]:checked').value);

        let canvas = document.querySelector("canvas");
        let ctx = canvas.getContext('2d');

        let game = new Game(mode);
        let board = new Board(100, 100, 200, canvas);
        let firstChipGame = new ChipGame(ctx, 34, colorOne, 1, imgPlayerOne);
        let secondChipGame = new ChipGame(ctx, 34, colorTwo, 2, imgPlayerTwo);
      
          // Función que descuenta de a un segundo y actualiza los valores 
        function updateSeconds() {
            seconds-=1;
            if (seconds == 0) {
                // El juego termina cuando el tiempo llega a 0
                game.gameFinished = true;
                window.clearInterval(interval);
            }
            minuteTimer.innerHTML = Math.floor(seconds / 60);
            secondTimer.innerHTML = seconds % 60;
    }

        // Dibujo tablero y fichas fijas
        board.drawBoard(game, firstChipGame, secondChipGame);

        let xChipPosInitial = canvas.width - 50
        let xChipPosFinal = canvas.width - 50
        let yChipPosInitial = 100
        let yChipPosFinal = 200

        // Se dibujan las fichas desde las cuales podremos arrastrar según el turno del jugador
        firstChipGame.draw(xChipPosInitial, yChipPosInitial, ctx);
        secondChipGame.draw(xChipPosFinal, yChipPosFinal, ctx);

        canvas.style.display = 'inline';
        let chip = firstChipGame;
        let isMovingChip = false;

        canvas.addEventListener('mousedown', function(e) {
            // Si el click es donde tengo las fichas fijas
            if (e.offsetX > xChipPosInitial - 50 && e.offsetX < xChipPosFinal + 50) {
                if (e.offsetY > yChipPosInitial - 50 && e.offsetY < yChipPosFinal + 50) {
                    board.drawBoard(game, firstChipGame, secondChipGame);
                    firstChipGame.draw(xChipPosInitial, yChipPosInitial, ctx);
                    secondChipGame.draw(xChipPosFinal, yChipPosFinal, ctx);
                    // Muevo el color de ficha depende de qué jugador esté jugando
                    chip = isPlayerOnePlaying ? firstChipGame : secondChipGame;
                    chip.draw(e.offsetX, e.offsetY);
                    // Activo eventos de drag and drop
                    canvas.addEventListener('mouseup', drop)
                    canvas.addEventListener('mousemove', moving)
                }
            }
        });

        function moving(event) {
            isMovingChip = true;
            board.drawBoard(game, firstChipGame, secondChipGame);
            firstChipGame.draw(xChipPosInitial, yChipPosInitial, ctx);
            secondChipGame.draw(xChipPosFinal, yChipPosFinal, ctx);
            chip.draw(event.offsetX, event.offsetY, ctx);
        }

        function drop(event) {
            // "suelta" la ficha
            if (isMovingChip) {
                canvas.removeEventListener('mousemove', moving, false);
            
                let column = game.checkColumn(event.offsetX);
                let chip = isPlayerOnePlaying ? "first" : "second"

                if (column > -1) {
                    game.play(column, chip);
                    isMovingChip = false;
                    isPlayerOnePlaying = !isPlayerOnePlaying;
                }
                board.drawBoard(game, firstChipGame, secondChipGame);
                firstChipGame.draw(xChipPosInitial, yChipPosInitial, ctx);
                secondChipGame.draw(xChipPosFinal, yChipPosFinal, ctx);
            }
            if (game.winner != null) {
                showWinner(game.winner);
            }
        }
        function showWinner(winner) {

        }
    } 
});