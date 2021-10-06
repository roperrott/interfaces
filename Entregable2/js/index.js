"use strict";
import {Game} from './Game.js';
import {Board} from './Board.js';
import {ChipGame} from './ChipGame.js';

document.addEventListener('DOMContentLoaded', () => {

    let btnStart = document.getElementById('save');
    btnStart.addEventListener('click', startNewGame());

    let btnRestart = document.getElementById('restart');
    btnRestart.addEventListener('click', startNewGame());

    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');

    let board = new Board(200, 1500, 80, ctx);
    let game = new Game(4); //pasamos por parametro el input que ingresa el usuario

    board.drawBoard(game);

    function startNewGame(){

    }
});