"use strict";
import { ChipGame } from "./ChipGame.js";

export class Board{
    xAxis;
    yAxis;
    size;
    ctx;
    highlighted;

    //constructor del board, con el eje "x" e "y" inicial, 
    //el tamanio de los bloques y el contexto del canvas.
    constructor(x, y, size, ctx){
        this.xAxis = x;
        this.yAxis = y;
        this.size = size;
        this.ctx = ctx;
    }

    setHighlight(c){
        this.highlighted = c;
    }

    drawBoard(game){
        //recorro las columnas
        for (let c = 0; c < game.matriz.length; c++){
            console.log(game.matriz);
            //recorro las filas por cada columna
            for(let r = 0; r < game.matriz[c].length; r++){
                //si la columna y la fila fueron definidas
                if(game.matriz[c][r] != undefined){
                    this.drawEmptyPosition(c,r);
                    x = this.xAxis + c * this.size + this.size / 2;
                    y = this.yAxis + r * this.size + this.size / 2;
                    game.matriz[c][r].draw(x, y);

                }else{
                    //dibuja una posicion en esa columna y esa fila
                    this.drawEmptyPosition(c, r);
                }
            }
        }
    }

    drawEmptyPosition(c, r){
        let radious = 30;
        this.ctx.fillStyle = '#212529';
    
        //dibuja el cuadrado
        this.ctx.fillRect(this.xAxis + c * this.size, this.yAxis + r * this.size, this.size, this.size);

        //dibuja el circulo para insertar la ficha
        this.ctx.beginPath();
        this.ctx.fillStyle = 'white';
        this.ctx.arc(this.xAxis + c * this.size/2, this.yAxis + r * this.size/2, radious, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
        
        //dibuja los limites entre las columnas y las filas
        this.drawDelimiters(this.xAxis + c * this.size, this.yAxis + r * this.size, this.size, this.size);
    }

    drawDelimiters(x, y, width, height){
        let line = 1;
        this.ctx.beginPath();
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(x - line, y - line, width + (2*line), height + (2*line));
    }
}