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

    function startNewGame(){
        console.log("new game started");
        let game = new Game(4);
        let board = new Board(100, 100, 200, canvas);
        console.log("WINDOW -> " + window.innerWidth)
        board.drawBoard(game);
    }
})