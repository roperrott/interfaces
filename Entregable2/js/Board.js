"use strict";
import { ChipGame } from "./ChipGame.js";

export class Board{
    xAxis;
    yAxis;
    size;
    canvas;
    highlighted;
    ctx;

    //constructor del board, con el eje "x" e "y" inicial, 
    //el tamanio de los bloques y el contexto del canvas.
    constructor(x, y, size, canvas){
        this.xAxis = x;
        this.yAxis = y;
        this.size = size;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    setHighlight(c){
        this.highlighted = c;
    }

    drawBoard(game, firstChip, secondChip){
        console.log("drawing board")

        this.canvas.width = (game.matriz.length * (this.size * 0.70));
        this.canvas.height =  (game.matriz.length - 1) * (this.size * 0.70);

        //recorro las columnas
        for (let c = 0; c < game.matriz.length; c++){
            //recorro las filas por cada columna
            for(let r = 0; r < game.matriz[c].length; r++){

                //si la columna y la fila fueron definidas
                if(game.matriz[c][r] != undefined){

                    let chip = firstChip
                    if (game.matriz[c][r] == "second") {
                        chip = secondChip
                    }
                    this.drawEmptyPosition(c,r);
                    let x = this.xAxis * (c+1);
                    let y = this.yAxis * (r+1);
                    chip.draw(x, y);
                }else{
                    //dibuja una posicion en esa columna y esa fila
                    this.drawEmptyPosition(c, r);
                }
               // this.drawEmptyPosition(c, r);
            }
        }
    }

    drawEmptyPosition(c, r){
        let radious = 30;
        if(this.highlighted == c){
            this.ctx.fillStyle = '';
        }else{
            this.ctx.fillStyle = 'pink';
        }

        //dibuja el circulo para insertar la ficha
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.arc(this.xAxis + c * this.size/2, this.yAxis + r * this.size/2, radious, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawDelimiters(x, y, width, height){
        let line = 1;
        this.ctx.beginPath();
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(x - line, y - line, width + (2*line), height + (2*line));
    }
}