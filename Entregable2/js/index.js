"use strict";
import {Game} from './Game';
import {Board} from './Board';
import {ChipGame} from './ChipGame';

document.addEventListener('DOMContentLoaded', () => {

    let btnStart = document.getElementById('save');
    btnStart.addEventListener('click', startNewGame());

    let btnRestart = document.getElementById('restart');
    btnRestart.addEventListener('click', startNewGame());

    let canvas = document.getElementsByTagName('canvas');
    let ctx = canvas.getContext('2d');

    function startNewGame(){
        
    }
})