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
        this.gameMode = mode + 1;
        this.matriz = new Array(this.gameMode);

        for(let i = 0; i < this.matriz.length; i++) {
            this.matriz[i] = new Array(this.gameMode);
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
                        return;
                    }
                }
            }
           // thisGameFinished = this.isThereWinner(gameMode);
        }
    }

    isThereWinner(gameMode) {
        // checkear si hay "gameMode" cantidad en linea
        return false;
    }

    checkColumn(x) {
        let initialX = 50
        for(let i = 1; i<=this.matriz.length; i++) {
            if (x > initialX && x < initialX + i*100 ) {
                console.log("RETURN COLUMN -> " + (i-1));
                return i-1
            }
        }
        return -1
    }
}