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

    let imgPlayerOne = new Image();
    let imgPlayerTwo = new Image();
    baseImageBlack.src = '../'
    baseImageWhite.src = '../'

    function startNewGame(){
      
        let colorOne = document.querySelector('#one-color').value;
        let colorTwo = document.querySelector('#two-color').value;
        let mode = parseInt(document.querySelector('input[name="inLine"]:checked').value);
        console.log(mode);

        let canvas = document.querySelector("canvas");
        console.log("new game started");
        let game = new Game(mode);
        let board = new Board(100, 100, 200, canvas);

        board.drawBoard(game);
        canvas.style.display = 'inline'
    }

});