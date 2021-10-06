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
        this.ctx = canvas.getContext('2d');
    }

    setHighlight(c){
        this.highlighted = c;
    }

    drawBoard(game){
        console.log("drawing board")

        this.canvas.width = game.matriz.length * this.size;
        this.canvas.height =  (game.matriz.length - 1) * this.size;

        //recorro las columnas
        for (let c = 0; c < game.matriz.length; c++){
            //recorro las filas por cada columna
            for(let r = 0; r < game.matriz[c].length; r++){
                //si la columna y la fila fueron definidas
              /*  if(game.matriz[c][r] /*!= undefined){
                    console.log(" draw ");
                    this.drawEmptyPosition(c,r);
                    x = this.xAxis + c * this.size + this.size / 2;
                    y = this.yAxis + r * this.size + this.size / 2;
                    game.matriz[c][r].draw(x, y);

                }else{
                    //dibuja una posicion en esa columna y esa fila
                    console.log("draw empty col -> " + c + " row -> " + r);
                    this.drawEmptyPosition(c, r);
                }
                */
                this.drawEmptyPosition(c, r);
               
               // this.drawEmptyChip(c, r);
            }
        }
    }

    drawEmptyChip(col, row) {

        let xmaxchips = 6
        let ymaxchips = 6
        let canvas = document.querySelector("canvas");

        console.log("draw");
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.xAxis + col * this.size, this.yAxis + row * this.size, this.size, this.size);

        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.lineWidth = 7;
         this.ctx.arc((canvas.width/xmaxchips)*row+(xmaxchips*ymaxchips), 
                (canvas.height/ymaxchips)*col+(xmaxchips*ymaxchips), 
                36, 0, Math.PI*2);
                this.ctx.strokeStyle = 'pink';
                // this.ctx.setLineDash([2.5, 0.5]);
                this.ctx.stroke();
                this.ctx.fill();
                this.ctx.closePath();
        
              
    }

    drawEmptyPosition(c, r){
        // radious = 35;
        let radious = 35;
        if(this.highlighted == c){
            this.ctx.fillStyle = '';
        }else{
            this.ctx.fillStyle = 'pink';
        }
        //dibuja el cuadrado
        this.ctx.beginPath();
        this.ctx.fillRect(this.xAxis + c * this.size/2, this.yAxis + r * this.size/2, this.size/4, this.size/4);
        this.ctx.closePath();

        //dibuja el circulo para insertar la ficha
        this.ctx.beginPath();
        this.ctx.fillStyle = 'white';
        this.ctx.arc(this.xAxis + c * this.size/2, this.yAxis + r * this.size/2, radious, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
        
        //dibuja los limites entre las columnas y las filas
        // this.drawDelimiters(this.xAxis + c * this.size, this.yAxis + r * this.size, this.size, this.size);
    }

    drawDelimiters(x, y, width, height){
        // line = 1;
        let line = 1;
        this.ctx.beginPath();
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(x - line, y - line, width + (2*line), height + (2*line));
    }
}