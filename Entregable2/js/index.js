"use strict";
import {Game} from './Game.js';
import {Board} from './Board.js';
import {ChipGame} from './ChipGame.js';

document.addEventListener('DOMContentLoaded', () => {

    let btnStart = document.getElementById('save');
    btnStart.addEventListener('click', startNewGame);

    let btnRestart = document.getElementById('restart');
    btnRestart.addEventListener('click', startNewGame);

    let imgPlayerOne = new Image();
    let imgPlayerTwo = new Image();

    imgPlayerOne.src = './img/redChip.png';
    imgPlayerTwo.src = './img/blackChip.png';

    function startNewGame(){

        let isPlayerOnePlaying = true
        let colorOne = document.querySelector('#one-color').value;
        let colorTwo = document.querySelector('#two-color').value;
        let mode = parseInt(document.querySelector('input[name="inLine"]:checked').value);
        console.log(mode);

        let canvas = document.querySelector("canvas");
        let ctx = canvas.getContext('2d');
        console.log("new game started");
        let game = new Game(mode);
        let board = new Board(100, 100, 200, canvas);
        let firstChipGame = new ChipGame(ctx, 34, colorOne, 1, imgPlayerOne);
        let secondChipGame = new ChipGame(ctx, 34, colorTwo, 2, imgPlayerTwo);
      
        // Dibujo tablero y fichas fijas
        board.drawBoard(game, firstChipGame, secondChipGame);

        let xChipPosInitial = canvas.width - 50
        let xChipPosFinal = canvas.width - 50
        let yChipPosInitial = 100
        let yChipPosFinal = 200

        firstChipGame.draw(xChipPosInitial, yChipPosInitial, ctx);
        secondChipGame.draw(xChipPosFinal, yChipPosFinal, ctx);

        canvas.style.display = 'inline';
        canvas.style.margin = '0';
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
           // ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        }
    } 
});