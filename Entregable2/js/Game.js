"use strict";

//La clase Game posee la logica del juego, como sus jugadores
export class Game{
    winner;
    inItsTurn;
    justPlayed;
    matriz;
    gameFinished;
    gameMode;

    //pasa un parametro al constructor para definir el tamanio del tablero
    //crea un array y a cada posicion le asocio un array creando la matriz que conforma el tablero
    //por default el jugador 1 inicia el juego y la variable gameFinished es inicializada en false 
    constructor(mode){
        this.gameMode = mode;
        this.matriz = new Array(this.gameMode + 1);
        this.winner = null;

        for(let i = 0; i < this.matriz.length; i++) {
            this.matriz[i] = new Array(this.gameMode + 1);
        }
    }
    
    //seteo el jugador para el proximo turno
    //cheque que jugador fue en ultimo lugar por la variable "justPlayed"
    //en funcion de eso setea el proximo turno al otro jugador y presupone que ya jugo 
    //para no pasar el jugador por parametro en el metodo play
    setNextPlayerTurn(){
        if (this.justPlayed == 1){
            this.inItsTurn = 2;
            this.justPlayed = 2; 
        }else{
            this.inItsTurn = 1;
            this.justPlayed = 1;
        }
        return this.inItsTurn;
    }

    //recibe como parametro una columna(eje x) del tablero en la que se insertara la ficha y la ficha en cuestion
    // se chequea que el juego no haya finalizado y se recorre el eje y de la columna por parametro
    //si la fila siguiente no se pasa del eje y y a su vez no es indefinida (es decir que ya hay una ficha), 
    //defino la ficha en el "y" actual
    play(x, chipGame){
        if(!this.gameFinished){
            let yAxisRef = this.matriz[x].length;
            for(let y = 0; y < yAxisRef; y++) {
                if(y + 1 < yAxisRef){
                    if(this.matriz[x][y + 1] != undefined){
                        if (this.matriz[x][y] == undefined) {
                            this.matriz[x][y] = chipGame;
                        }    
                    }
                }else{
                    if (this.matriz[x][y] == undefined) {
                        this.matriz[x][y] = chipGame;
                    }
                }
            }
            // Luego de ubicar cada ficha, se checkea si hay un ganador
            this.checkWinner(this.gameMode);
        }
    }

    checkWinner(gameMode) {
        if (!this.gameFinished) {
            this.checkByColumn(gameMode);
            this.checkByRow(gameMode);
            this.checkByDiagonals(gameMode);
        }  
        return this.winner;
    }

    checkByColumn(gameMode) {

        let firstRepeated = 0;
        let secondRepeated = 0;

        for (let x = 0; x < this.matriz.length; x++) {
            for (let y = this.matriz.length; y >= 0; y--) {
                if (this.matriz[x][y] != undefined) {
                    if (this.matriz[x][y] == "first") {
                        firstRepeated++;
                        secondRepeated = 0;
                    } else {
                        firstRepeated = 0;
                        secondRepeated++;
                    }
                } else {
                    firstRepeated = 0;
                    secondRepeated = 0;
                }
                if (firstRepeated == gameMode) {
                    this.gameFinished = true
                    this.winner = "first";
                }
                if (secondRepeated == gameMode) {
                    this.gameFinished = true;
                    this.winner = "second";
                }
            }
        }
    }

    checkByRow(gameMode) {

        let firstRepeated = 0;
        let secondRepeated = 0;

        for (let y = 0 ; y < this.matriz.length ; y++) {
            for (let x = 0; x < this.matriz.length; x++) {
                if (this.matriz[x][y] != undefined) {
                    if (this.matriz[x][y] == "first") {
                        firstRepeated++;
                        secondRepeated = 0;
                    } else {
                        firstRepeated = 0;
                        secondRepeated++;
                    }
                } else {
                    firstRepeated = 0;
                    secondRepeated = 0;
                }
                if (firstRepeated == gameMode) {
                    this.gameFinished = true
                    this.winner = "first";
               
                }
                if (secondRepeated == gameMode) {
                    this.gameFinished = true;
                    this.winner = "second";
                }
            }
        }
    }

    checkByDiagonals(gameMode) {
        for (let i = this.matriz.length; i > 0; i--) {
            this.checkMainDiagonal(gameMode,0, i);
            this.checkSecondaryDiagonal(gameMode,0, i);
        }
        for (let i = 0; i < this.matriz.length; i++) {
            this.checkMainDiagonal(gameMode, i, this.matriz.length);
            this.checkSecondaryDiagonal(gameMode, i, this.matriz.length);
        }
    }

    checkMainDiagonal(gameMode, start, length) {

        let firstRepeated = 0;
        let secondRepeated = 0;

        for (let i = start; i < length; i++) {
            for (let j = start; j < length; j++) { 
                if (this.matriz[i][j] != undefined) {
                    if (i === j) {
                        if (this.matriz[i][j] == "first") {
                            firstRepeated+=1;
                            secondRepeated = 0;
                        } 
                        if (this.matriz[i][j] == "second") {
                            secondRepeated+=1;
                            firstRepeated = 0;
                        }
                    }
                } 
                if (firstRepeated == gameMode) {
                    this.gameFinished = true
                    this.winner = "first";
                }
                if (secondRepeated == gameMode) {
                    this.gameFinished = true;
                    this.winner = "second";
                }
            }
        } 
    }

    checkSecondaryDiagonal(gameMode, start, length) {

        let firstRepeated = 0;
        let secondRepeated = 0;

        for (let i = start; i < length; i++) {
            for (let j = start; j < length; j++) {
                if (this.matriz[i][j] != undefined) {
                    if (j === (length - i - 1)) {
                        if (this.matriz[i][j] == "first") {
                            firstRepeated+=1;
                            secondRepeated = 0;
                            console.log("FIRST ++ -> " + firstRepeated);
                        } 
                        if (this.matriz[i][j] == "second") {
                            secondRepeated+=1;
                            firstRepeated = 0;
                            console.log("SECOND ++ -> " + secondRepeated);
                        }
                    }
                } 
                if (firstRepeated == gameMode) {
                    this.gameFinished = true
                    this.winner = "first";
                }
                if (secondRepeated == gameMode) {
                    this.gameFinished = true;
                    this.winner = "second";
                }
            }
        } 
    }

    checkColumn(x) {
        let initialX = 50
        for(let i = 1; i<=this.matriz.length; i++) {
            if (x > initialX && x < initialX + i*100 ) {
                return i-1
            }
        }
        return -1
    }
}