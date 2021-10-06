"use strict";
import {Figure} from './Figure.js'
//Clase ficha que extiende de la clase figura
//con atributo r --> radio de la ficha, color, jugador y la imagen


export class ChipGame extends Figure{
    r;
    color;
    player;
    image;

    constructor(ctx, r, color, player, image){
        super(ctx);
        this.r = r;
        this.color = color;
        this.player = player;
        this.image = image;
    }

    //metodo que posibilita cambiar el color de la ficha
    setChipColor(color){
        this.color = color;
    }

    //dibuja la ficha en el tablero dibujando un redondel y luego la imagen
    draw(x, y){
        this.x = x;
        this.y = y;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();

        //ctx.drawImage(this.image, x-27.5, y-27.5,  this.r+25,  this.r+25);
    }
}