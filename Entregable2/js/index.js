"use strict";
import {Game} from './Game.js';
import {Board} from './Board.js';
import {ChipGame} from './ChipGame.js';

document.addEventListener('DOMContentLoaded', () => {

    console.log("DOM CONTENT LOADED");

    let btnStart = document.getElementById('save');
    btnStart.addEventListener('click', startNewGame);

    let btnRestart = document.getElementById('restart');
    btnRestart.addEventListener('click', startNewGame);

    let canvas = document.querySelector("canvas");
    // let ctx = canvas.getContext('2d');

   // let board = new Board(200, 1500, 80, ctx);
   // let game = new Game(8); //pasamos por parametro el input que ingresa el usuario

    board.drawBoard(game);

    function startNewGame(){
        console.log("new game started");
<<<<<<< HEAD
        let game = new Game(9);
        let board = new Board(100, 100, 300, ctx);
=======
        let game = new Game(4);
        let board = new Board(100, 100, 200, canvas);
        console.log("WINDOW -> " + window.innerWidth)
>>>>>>> 58f4adf0367983d41457218a3f44ce3c5e1c6c49
        board.drawBoard(game);
    }
});