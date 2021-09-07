//Ejercicio 5
//Pintar un rectángulo en pantalla, utilizando tres colores en un gradiente: 
//De negro a amarillo en la primera mitad del ancho del rectángulo, 
//y de amarillo a rojo, en la segunda mitad. Por otro lado, en 
//Y el degrade se mantiene constante. 

let canvas = document.getElementById("canvas1");
let ctx2 = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;


let imageData = ctx2.createImageData(width, height); 
//nos devuelve un objeto ImageData, que representa un arreglo vacio

let r = 0;
let g = 0;
let b = 0;
let a = 255; //el alfa en 255 significa que no hay transparencia

//para que un valor sea gris todos los valores deben ser iguales
//dibujar rectangulo

let x = 0;
let y = 0;



function drawRect(imageData, r, g, b, a){

    //recorre todo el canvas, x --> ancho
    for(let x = 0; x < width; x++){
        let coeficiente = 225 / (width / 2);
        if(x < width /2){
            r = coeficiente * x;
            g = coeficiente * x;
            b = 0;
            a = 255;
        }else{
            r = x - coeficiente;
            g -= coeficiente;
            b = 0;
            a = 255;
        }
       

        for(let y = 0; y < height; y++){
            // el color vaya cambiando de acuerdo a cada iteracion en proporcion de nuestra altura
            setPixel(imageData, x, y, r, g, b, a);
        }
    }
}

drawRect(imageData, r, g, b, a);
ctx2.putImageData(imageData, 0, 0);

function setPixel(imageData, x, y, r, g, b, a){
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}
