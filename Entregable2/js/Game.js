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
        this.matriz = new Array(mode);
        for(let i in matriz){
            this.matriz[i] = new Array(mode);
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
    play(column, gameChip){
        if(!this.gameFinished){
            let yAxisRef = this.matriz[x].length;
            for(let y in yAxisRef){
                if(y + 1 < yAxisRef){
                    if(this.matriz[x][y + 1] != undefined){
                        this.matriz[x][y] = chipGame;    
                    }else{
                        this.matriz[x][y + 1] = chipGame;
                    }
                    return;
                }else{
                    this.matriz[x][y] = chipGame;
                    return;
                }
            }
        }
    }
}